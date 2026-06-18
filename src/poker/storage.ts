// Persistence: a single versioned localStorage blob for app state/settings,
// plus an IndexedDB store for custom audio blobs. Everything is defensive —
// storage may be unavailable (private mode), full, or corrupt; we degrade to
// in-memory operation rather than crash.

import type { LevelEntry, PersistedState, Settings, ThemeId } from './types';
import { defaultSettings } from './defaults';

const KEY = 'numericoasis.poker.timer.v1';
const THEME_KEY = 'oliclub.theme'; // tiny mirror read by the pre-paint bootstrap
export const CURRENT_VERSION = 1;

const VALID_THEMES: ThemeId[] = [
  'midnight-felt',
  'casino-classic',
  'oled-contrast',
  'amber-warm',
  'slate-cool',
  'paper-light',
];

let available: boolean | null = null;

export function storageAvailable(): boolean {
  if (available !== null) return available;
  try {
    const probe = '__poker_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    available = true;
  } catch {
    available = false;
  }
  return available;
}

// ---- Validation -------------------------------------------------------

function isFiniteNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function validEntry(e: unknown): e is LevelEntry {
  if (!e || typeof e !== 'object') return false;
  const x = e as Record<string, unknown>;
  if (typeof x.id !== 'string') return false;
  if (!isFiniteNum(x.durationSec) || (x.durationSec as number) < 0) return false;
  if (x.kind === 'break') return true;
  if (x.kind === 'blind') {
    return isFiniteNum(x.smallBlind) && isFiniteNum(x.bigBlind) && isFiniteNum(x.ante);
  }
  return false;
}

function coerceSettings(raw: unknown): Settings {
  const d = defaultSettings();
  if (!raw || typeof raw !== 'object') return d;
  const s = raw as Record<string, unknown>;
  const out: Settings = { ...d };
  if (typeof s.theme === 'string' && (VALID_THEMES as string[]).includes(s.theme)) out.theme = s.theme as ThemeId;
  if (typeof s.sound === 'string') out.sound = s.sound;
  if (isFiniteNum(s.volume)) out.volume = Math.min(1, Math.max(0, s.volume));
  for (const k of [
    'muted', 'soundEnabled', 'warn60', 'flashLast60', 'showChips',
    'showChipsFullscreen', 'autoFullscreen', 'keepAwake', 'resumeRunningOnReload',
  ] as const) {
    if (typeof s[k] === 'boolean') (out[k] as boolean) = s[k] as boolean;
  }
  return out;
}

/** Parse + validate + clamp. Returns null when nothing usable is stored. */
export function load(): PersistedState | null {
  if (!storageAvailable()) return null;
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Corrupt JSON — self-heal by discarding it.
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    return null;
  }

  if (!parsed || typeof parsed !== 'object') return null;
  const p = parsed as Record<string, unknown>;

  // Migrations would run here (p.version < CURRENT_VERSION). v1 is the first schema.
  const version = isFiniteNum(p.version) ? (p.version as number) : 0;
  if (version > CURRENT_VERSION) {
    // Written by a newer deploy — don't trust it, fall back to defaults in
    // memory but leave storage intact so the newer version can read it again.
    return null;
  }

  const entries = Array.isArray(p.entries) ? (p.entries as unknown[]).filter(validEntry) as LevelEntry[] : [];
  if (entries.length === 0) return null;

  const t = (p.timer && typeof p.timer === 'object' ? p.timer : {}) as Record<string, unknown>;
  const statusOk = ['idle', 'running', 'paused', 'finished'].includes(t.status as string);
  let currentIndex = isFiniteNum(t.currentIndex) ? Math.trunc(t.currentIndex as number) : 0;
  currentIndex = Math.min(entries.length - 1, Math.max(0, currentIndex));
  const remainingSec = isFiniteNum(t.remainingSec) ? Math.max(0, t.remainingSec as number) : entries[currentIndex].durationSec;
  const endsAt = isFiniteNum(t.endsAt) ? (t.endsAt as number) : null;

  const state: PersistedState = {
    version: CURRENT_VERSION,
    savedAt: isFiniteNum(p.savedAt) ? (p.savedAt as number) : Date.now(),
    entries,
    timer: {
      status: statusOk ? (t.status as PersistedState['timer']['status']) : 'idle',
      currentIndex,
      remainingSec,
      endsAt,
    },
    settings: coerceSettings(p.settings),
  };
  return state;
}

// ---- Writing (debounced + immediate) ----------------------------------

let pending: PersistedState | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

function writeNow(state: PersistedState): void {
  if (!storageAvailable()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    localStorage.setItem(THEME_KEY, state.settings.theme);
  } catch {
    // Quota or other failure — stop trying to persist this session.
    available = false;
  }
}

export function save(state: PersistedState, immediate = false): void {
  if (immediate) {
    if (timer) { clearTimeout(timer); timer = null; }
    pending = null;
    writeNow(state);
    return;
  }
  pending = state;
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    if (pending) { writeNow(pending); pending = null; }
  }, 400);
}

export function flush(): void {
  if (timer) { clearTimeout(timer); timer = null; }
  if (pending) { writeNow(pending); pending = null; }
}

export function mirrorTheme(theme: ThemeId): void {
  if (!storageAvailable()) return;
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
}

// ---- IndexedDB: custom audio blobs ------------------------------------

const DB_NAME = 'oliclub-audio';
const DB_STORE = 'sounds';

export interface StoredSound {
  id: string;
  name: string;
  mime: string;
  size: number;
  blob: Blob;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('no-indexeddb')); return; }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('idb-open-failed'));
  });
}

export async function putSound(rec: StoredSound): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(rec);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getSound(id: string): Promise<StoredSound | null> {
  const db = await openDb();
  const rec = await new Promise<StoredSound | null>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(id);
    req.onsuccess = () => resolve((req.result as StoredSound) ?? null);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return rec;
}

export async function deleteSound(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function listSounds(): Promise<StoredSound[]> {
  const db = await openDb();
  const all = await new Promise<StoredSound[]>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).getAll();
    req.onsuccess = () => resolve((req.result as StoredSound[]) ?? []);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return all;
}
