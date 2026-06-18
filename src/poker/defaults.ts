import type { BlindLevel, BreakEntry, ChipDef, LevelEntry, Settings, TimerState } from './types';
import { defaultPalette } from './palette';

export const LEVEL_SECONDS = 12 * 60; // 12 minutes
export const BREAK_SECONDS = 15 * 60; // 15 minutes

/** sb / bb / ante for the 26 default blind levels (L21 corrected to 5000/10000/1000). */
const DEFAULT_BLINDS: ReadonlyArray<readonly [number, number, number]> = [
  [50, 100, 0],
  [100, 200, 0],
  [150, 300, 0],
  [200, 400, 0],
  [250, 500, 50],
  [300, 600, 50],
  [400, 800, 50],
  [500, 1000, 100], // L8 — break inserted after this one
  [600, 1200, 100],
  [700, 1400, 100],
  [800, 1600, 100],
  [900, 1800, 100],
  [1000, 2000, 200],
  [1500, 3000, 300],
  [2000, 4000, 400],
  [2500, 5000, 500],
  [3000, 6000, 600],
  [3500, 7000, 700],
  [4000, 8000, 800],
  [4500, 9000, 900],
  [5000, 10000, 1000],
  [7500, 15000, 0],
  [10000, 20000, 0],
  [15000, 30000, 0],
  [20000, 40000, 0],
  [25000, 50000, 0],
];

/** Insert the 15-minute break after this many blind levels. */
const BREAK_AFTER_LEVEL = 8;

let idCounter = 0;
function makeId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  idCounter += 1;
  return `id-${Date.now().toString(36)}-${idCounter}`;
}

export function newBlind(
  smallBlind: number,
  bigBlind: number,
  ante = 0,
  durationSec = LEVEL_SECONDS,
): BlindLevel {
  return { kind: 'blind', id: makeId(), smallBlind, bigBlind, ante, durationSec };
}

export function newBreak(durationSec = BREAK_SECONDS, label = 'Break'): BreakEntry {
  return { kind: 'break', id: makeId(), label, durationSec };
}

/** Build a fresh default structure (new ids each time). */
export function defaultEntries(): LevelEntry[] {
  const out: LevelEntry[] = [];
  DEFAULT_BLINDS.forEach(([sb, bb, ante], i) => {
    out.push(newBlind(sb, bb, ante));
    if (i + 1 === BREAK_AFTER_LEVEL) out.push(newBreak());
  });
  return out;
}

export function defaultTimer(entries: LevelEntry[]): TimerState {
  return {
    status: 'idle',
    currentIndex: 0,
    remainingSec: entries[0]?.durationSec ?? 0,
    endsAt: null,
  };
}

export function defaultSettings(): Settings {
  return {
    palette: defaultPalette(),
    savedPalettes: [],
    sound: 'air-horn',
    volume: 0.85,
    muted: false,
    soundEnabled: true,
    warn60: true,
    flashLast60: true,
    showChips: true,
    showLogo: true,
    logoFullscreen: false,
    customLogo: false,
    autoFullscreen: false,
    keepAwake: true,
    resumeRunningOnReload: false,
  };
}

/** Default chip denominations (colour → value), editable in the Chips tab. */
const CHIP_BASE: ReadonlyArray<{ color: string; value: number }> = [
  { color: '#2f6fd0', value: 50 },     // blue
  { color: '#e9e9ec', value: 100 },    // white
  { color: '#cf2b3a', value: 500 },    // red
  { color: '#2b2b30', value: 1000 },   // black
  { color: '#e6c12e', value: 5000 },   // yellow
  { color: '#7b3fb5', value: 10000 },  // purple
  { color: '#2f9e5f', value: 25000 },  // green
];

export function newChip(color = '#cccccc', value = 0): ChipDef {
  return { id: makeId(), color, value };
}

export function defaultChips(): ChipDef[] {
  return CHIP_BASE.map((c) => newChip(c.color, c.value));
}
