// The state machine + action API. Holds the canonical state, runs the drift-free
// tick pump, and emits domain events (level:end, etc.) for audio / wake lock.

import { clamp, endsAtFromRemaining, remainingFromEndsAt } from './clock';
import { defaultEntries, defaultSettings, defaultTimer } from './defaults';
import * as storage from './storage';
import type { AppState, LevelEntry, Settings, TimerEvent, TimerState } from './types';

const TICK_MS = 250;

type StateListener = (s: AppState) => void;
type EventListener = () => void;

class Store {
  private entries: LevelEntry[] = [];
  private timer: TimerState = { status: 'idle', currentIndex: 0, remainingSec: 0, endsAt: null };
  private settings: Settings = defaultSettings();
  private inMemoryOnly = false;

  private tickHandle: number | null = null;
  private scrubbing = false;
  private warned60Index = -1;

  private stateSubs = new Set<StateListener>();
  private eventSubs = new Map<TimerEvent, Set<EventListener>>();

  // ---- lifecycle -----------------------------------------------------

  init(): void {
    const loaded = storage.load();
    if (loaded) {
      this.entries = loaded.entries;
      this.timer = loaded.timer;
      this.settings = loaded.settings;
    } else {
      this.entries = defaultEntries();
      this.timer = defaultTimer(this.entries);
      this.settings = defaultSettings();
    }
    this.inMemoryOnly = !storage.storageAvailable();

    this.reconcileOnLoad();

    // Force an immediate, accurate tick when the tab becomes visible again and
    // flush state before the page goes away.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') this.tick();
    });
    window.addEventListener('pageshow', () => this.tick());
    window.addEventListener('pagehide', () => storage.flush());
    window.addEventListener('beforeunload', () => storage.flush());

    if (this.timer.status === 'running') this.startPump();
  }

  /** Recompute the timer against the wall clock after a reload. */
  private reconcileOnLoad(): void {
    const t = this.timer;
    if (t.status === 'running') {
      if (t.endsAt == null) {
        t.status = 'paused';
        return;
      }
      const rem = remainingFromEndsAt(t.endsAt);
      if (rem > 0) {
        if (this.settings.resumeRunningOnReload) {
          // keep running with the existing anchor
          t.remainingSec = rem;
        } else {
          t.status = 'paused';
          t.remainingSec = rem;
          t.endsAt = null;
        }
      } else {
        // Level(s) elapsed while we were gone — advance to the right place.
        this.runCatchUp(t.endsAt, false);
        if (this.timer.status === 'running' && !this.settings.resumeRunningOnReload) {
          this.timer.status = 'paused';
          this.timer.endsAt = null;
        }
      }
    }
  }

  // ---- subscriptions -------------------------------------------------

  subscribe(fn: StateListener): () => void {
    this.stateSubs.add(fn);
    return () => this.stateSubs.delete(fn);
  }

  on(event: TimerEvent, fn: EventListener): () => void {
    let set = this.eventSubs.get(event);
    if (!set) { set = new Set(); this.eventSubs.set(event, set); }
    set.add(fn);
    return () => set!.delete(fn);
  }

  private emit(event: TimerEvent): void {
    this.eventSubs.get(event)?.forEach((fn) => fn());
  }

  private notify(): void {
    const snap = this.getState();
    this.stateSubs.forEach((fn) => fn(snap));
  }

  getState(): AppState {
    return {
      entries: this.entries,
      timer: this.timer,
      settings: this.settings,
      inMemoryOnly: this.inMemoryOnly,
    };
  }

  // ---- persistence ---------------------------------------------------

  private persist(immediate = false): void {
    storage.save(
      {
        version: storage.CURRENT_VERSION,
        savedAt: Date.now(),
        entries: this.entries,
        timer: this.timer,
        settings: this.settings,
      },
      immediate,
    );
  }

  // ---- helpers -------------------------------------------------------

  private cur(): LevelEntry | undefined { return this.entries[this.timer.currentIndex]; }
  private curDuration(): number { return this.cur()?.durationSec ?? 0; }
  private currentId(): string | null { return this.cur()?.id ?? null; }

  private liveRemaining(): number {
    const t = this.timer;
    if (t.status === 'running' && t.endsAt != null) return remainingFromEndsAt(t.endsAt);
    return t.remainingSec;
  }

  private startPump(): void {
    if (this.tickHandle != null) return;
    this.tickHandle = window.setInterval(() => this.tick(), TICK_MS);
  }
  private stopPump(): void {
    if (this.tickHandle != null) { window.clearInterval(this.tickHandle); this.tickHandle = null; }
  }

  private tick(): void {
    const t = this.timer;
    if (t.status !== 'running' || t.endsAt == null) return;
    const rem = remainingFromEndsAt(t.endsAt);
    t.remainingSec = rem;
    if (this.scrubbing) { this.notify(); return; }
    if (rem > 0 && rem <= 60 && this.warned60Index !== t.currentIndex) {
      this.warned60Index = t.currentIndex;
      this.emit('level:warning60');
    }
    if (rem <= 0) {
      this.expire();
    } else {
      this.notify();
    }
  }

  /** Auto-advance across every boundary crossed since `fromEndsAt`. */
  private runCatchUp(fromEndsAt: number, fireSound: boolean): void {
    const now = Date.now();
    let overshootMs = Math.max(0, now - fromEndsAt);
    let crossed = 0;
    const max = this.entries.length + 1;
    for (let i = 0; i < max; i++) {
      if (this.timer.currentIndex + 1 >= this.entries.length) {
        this.timer.status = 'finished';
        this.timer.endsAt = null;
        this.timer.remainingSec = 0;
        this.stopPump();
        crossed++;
        break;
      }
      this.timer.currentIndex += 1;
      crossed++;
      const durMs = this.curDuration() * 1000;
      if (overshootMs < durMs) {
        this.timer.remainingSec = Math.max(0, Math.round((durMs - overshootMs) / 1000));
        this.timer.endsAt = now - overshootMs + durMs;
        break;
      }
      overshootMs -= durMs;
    }
    this.warned60Index = -1;
    if (crossed > 0) {
      if (this.timer.status === 'finished') this.emit('finished');
      if (fireSound) this.emit('level:end');
    }
  }

  private expire(): void {
    const from = this.timer.endsAt ?? Date.now();
    this.runCatchUp(from, true);
    this.persist(true);
    this.notify();
  }

  // ---- transport actions --------------------------------------------

  play(): void {
    if (this.entries.length === 0 || this.timer.status === 'running') return;
    if (this.timer.status === 'finished') return;
    this.timer.status = 'running';
    this.timer.endsAt = endsAtFromRemaining(this.timer.remainingSec);
    this.startPump();
    this.emit('running');
    this.persist(true);
    this.notify();
  }

  pause(): void {
    const t = this.timer;
    if (t.status !== 'running') return;
    t.remainingSec = t.endsAt != null ? remainingFromEndsAt(t.endsAt) : t.remainingSec;
    t.endsAt = null;
    t.status = 'paused';
    this.stopPump();
    this.emit('paused');
    this.persist(true);
    this.notify();
  }

  toggle(): void {
    if (this.timer.status === 'running') this.pause();
    else this.play();
  }

  restartLevel(): void {
    this.timer.remainingSec = this.curDuration();
    this.warned60Index = -1;
    if (this.timer.status === 'running') {
      this.timer.endsAt = endsAtFromRemaining(this.timer.remainingSec);
    }
    this.persist(true);
    this.notify();
  }

  next(): void {
    if (this.entries.length === 0) return;
    const t = this.timer;
    if (t.currentIndex + 1 >= this.entries.length) {
      t.status = 'finished';
      t.endsAt = null;
      t.remainingSec = 0;
      this.stopPump();
      this.emit('finished');
    } else {
      const wasRunning = t.status === 'running';
      t.currentIndex += 1;
      t.remainingSec = this.curDuration();
      this.warned60Index = -1;
      t.endsAt = wasRunning ? endsAtFromRemaining(t.remainingSec) : null;
    }
    this.persist(true);
    this.notify();
  }

  prev(): void {
    if (this.entries.length === 0) return;
    const t = this.timer;
    if (t.status === 'finished') {
      t.status = 'paused';
      t.remainingSec = this.curDuration();
      t.endsAt = null;
      this.warned60Index = -1;
    } else if (t.currentIndex <= 0) {
      return; // no-op
    } else {
      const wasRunning = t.status === 'running';
      t.currentIndex -= 1;
      t.remainingSec = this.curDuration();
      this.warned60Index = -1;
      t.endsAt = wasRunning ? endsAtFromRemaining(t.remainingSec) : null;
    }
    this.persist(true);
    this.notify();
  }

  goToIndex(index: number): void {
    if (index < 0 || index >= this.entries.length) return;
    const t = this.timer;
    const wasRunning = t.status === 'running';
    t.currentIndex = index;
    t.remainingSec = this.curDuration();
    this.warned60Index = -1;
    if (t.status === 'finished') t.status = 'paused';
    t.endsAt = wasRunning ? endsAtFromRemaining(t.remainingSec) : null;
    this.persist(true);
    this.notify();
  }

  /** Seek within the current level. value = remaining seconds. */
  seek(value: number, isFinal = false): void {
    const t = this.timer;
    const clamped = clamp(Math.round(value), 0, this.curDuration());
    t.remainingSec = clamped;
    this.scrubbing = !isFinal;
    if (t.status === 'running') t.endsAt = endsAtFromRemaining(clamped);
    if (clamped > 60) this.warned60Index = -1;
    this.persist(isFinal);
    this.notify();
  }

  // ---- editor actions ------------------------------------------------

  updateEntry(id: string, patch: Partial<LevelEntry>): void {
    const idx = this.entries.findIndex((e) => e.id === id);
    if (idx === -1) return;
    const entry = this.entries[idx];
    const isCurrent = idx === this.timer.currentIndex;
    const durationChanged = 'durationSec' in patch && patch.durationSec !== entry.durationSec;
    let elapsed = 0;
    if (isCurrent && durationChanged) elapsed = entry.durationSec - this.liveRemaining();

    this.entries[idx] = { ...entry, ...patch } as LevelEntry;

    if (isCurrent && durationChanged) {
      const newDur = this.entries[idx].durationSec;
      const newRem = clamp(newDur - elapsed, 0, newDur);
      this.timer.remainingSec = newRem;
      if (this.timer.status === 'running') this.timer.endsAt = endsAtFromRemaining(newRem);
    }
    this.persist(); // debounced — editor typing
    this.notify();
  }

  moveEntry(id: string, dir: -1 | 1): void {
    const idx = this.entries.findIndex((e) => e.id === id);
    const target = idx + dir;
    if (idx === -1 || target < 0 || target >= this.entries.length) return;
    const curId = this.currentId();
    const arr = this.entries;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    if (curId) this.timer.currentIndex = arr.findIndex((e) => e.id === curId);
    this.persist(true);
    this.notify();
  }

  insertAfter(id: string, entry: LevelEntry): void {
    const idx = this.entries.findIndex((e) => e.id === id);
    const curId = this.currentId();
    const at = idx === -1 ? this.entries.length : idx + 1;
    this.entries.splice(at, 0, entry);
    if (curId) this.timer.currentIndex = this.entries.findIndex((e) => e.id === curId);
    this.persist(true);
    this.notify();
  }

  appendEntry(entry: LevelEntry): void {
    this.entries.push(entry);
    this.persist(true);
    this.notify();
  }

  deleteEntry(id: string): void {
    const idx = this.entries.findIndex((e) => e.id === id);
    if (idx === -1) return;
    const curId = this.currentId();
    const wasCurrent = id === curId;
    this.entries.splice(idx, 1);

    if (this.entries.length === 0) {
      this.timer = { status: 'idle', currentIndex: 0, remainingSec: 0, endsAt: null };
      this.stopPump();
    } else if (wasCurrent) {
      const newIndex = Math.min(idx, this.entries.length - 1);
      this.timer.currentIndex = newIndex;
      this.timer.remainingSec = this.curDuration();
      this.timer.endsAt = null;
      this.timer.status = 'paused';
      this.warned60Index = -1;
      this.stopPump();
    } else if (curId) {
      this.timer.currentIndex = this.entries.findIndex((e) => e.id === curId);
    }
    this.persist(true);
    this.notify();
  }

  /** Replace an entry wholesale (used by undo). */
  restoreEntryAt(index: number, entry: LevelEntry): void {
    const i = clamp(index, 0, this.entries.length);
    this.entries.splice(i, 0, entry);
    this.persist(true);
    this.notify();
  }

  resetStructure(): void {
    this.entries = defaultEntries();
    this.timer = defaultTimer(this.entries);
    this.warned60Index = -1;
    this.stopPump();
    this.emit('stopped');
    this.persist(true);
    this.notify();
  }

  // ---- settings ------------------------------------------------------

  setSetting<K extends keyof Settings>(key: K, value: Settings[K]): void {
    this.settings[key] = value;
    if (key === 'theme') storage.mirrorTheme(this.settings.theme);
    this.persist(true);
    this.notify();
  }
}

export const store = new Store();
