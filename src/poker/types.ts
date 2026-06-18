// Domain types for the Oliclub Poker Timer.

export type EntryKind = 'blind' | 'break';

export interface BlindLevel {
  kind: 'blind';
  id: string;
  smallBlind: number;
  bigBlind: number;
  ante: number;
  durationSec: number;
}

export interface BreakEntry {
  kind: 'break';
  id: string;
  label: string;
  durationSec: number;
}

export type LevelEntry = BlindLevel | BreakEntry;

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface TimerState {
  status: TimerStatus;
  currentIndex: number;
  /** Authoritative when paused/idle/finished; mirrored each tick while running. */
  remainingSec: number;
  /** Date.now() ms at which the current level hits 0. Non-null IFF running. */
  endsAt: number | null;
}

export type ThemeId =
  | 'midnight-felt'
  | 'casino-classic'
  | 'oled-contrast'
  | 'amber-warm'
  | 'slate-cool'
  | 'paper-light';

export interface Settings {
  theme: ThemeId;
  /** preset id ('air-horn'…) or 'custom:<id>' */
  sound: string;
  /** 0..1 */
  volume: number;
  muted: boolean;
  soundEnabled: boolean;
  /** play a softer cue at T-minus-60s */
  warn60: boolean;
  /** flash/pulse the clock during the final minute */
  flashLast60: boolean;
  showChips: boolean;
  showChipsFullscreen: boolean;
  autoFullscreen: boolean;
  keepAwake: boolean;
  /** if true, a reload while running keeps running instead of pausing */
  resumeRunningOnReload: boolean;
}

export interface PersistedState {
  version: number;
  savedAt: number;
  entries: LevelEntry[];
  timer: TimerState;
  settings: Settings;
}

/** What the store exposes to renderers — persisted data plus derived view info. */
export interface AppState {
  entries: LevelEntry[];
  timer: TimerState;
  settings: Settings;
  /** true when localStorage is unavailable and we run in-memory only */
  inMemoryOnly: boolean;
}

/** Domain events emitted by the timer for side-effects (sound, wake lock). */
export type TimerEvent =
  | 'level:end'
  | 'level:warning60'
  | 'running'
  | 'paused'
  | 'stopped'
  | 'finished';
