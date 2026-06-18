// Pure view-derivations over AppState. Breaks are part of the entry list but do
// not count toward the "Level N of M" numbering (which counts blinds only).

import type { AppState, BlindLevel, LevelEntry } from './types';

export function isBreak(e: LevelEntry | undefined): e is import('./types').BreakEntry {
  return !!e && e.kind === 'break';
}
export function isBlind(e: LevelEntry | undefined): e is BlindLevel {
  return !!e && e.kind === 'blind';
}

export function currentEntry(s: AppState): LevelEntry | undefined {
  return s.entries[s.timer.currentIndex];
}

export function nextEntry(s: AppState): LevelEntry | undefined {
  return s.entries[s.timer.currentIndex + 1];
}

export function totalBlinds(s: AppState): number {
  return s.entries.reduce((n, e) => (e.kind === 'blind' ? n + 1 : n), 0);
}

/** 1-based blind number of the current entry, or the upcoming blind during a break. */
export function blindNumber(s: AppState): number {
  let n = 0;
  for (let i = 0; i <= s.timer.currentIndex && i < s.entries.length; i++) {
    if (s.entries[i].kind === 'blind') n++;
  }
  return n;
}

export function progressFraction(s: AppState): number {
  const dur = currentEntry(s)?.durationSec ?? 0;
  if (dur <= 0) return 0;
  return Math.min(1, Math.max(0, s.timer.remainingSec / dur));
}

/** The blind level that a break resumes into (next blind after the break). */
export function resumingBlindNumber(s: AppState): number | null {
  for (let i = s.timer.currentIndex + 1; i < s.entries.length; i++) {
    if (s.entries[i].kind === 'blind') {
      let n = 0;
      for (let j = 0; j <= i; j++) if (s.entries[j].kind === 'blind') n++;
      return n;
    }
  }
  return null;
}
