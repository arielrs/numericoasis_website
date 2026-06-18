// Pure, drift-free time math. The single source of truth while running is the
// absolute wall-clock timestamp `endsAt`; remaining is always recomputed, never
// decremented, so a throttled/backgrounded tab self-corrects on its next read.

export function remainingFromEndsAt(endsAt: number, now: number = Date.now()): number {
  return Math.max(0, Math.round((endsAt - now) / 1000));
}

export function endsAtFromRemaining(remainingSec: number, now: number = Date.now()): number {
  return now + remainingSec * 1000;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Format seconds as M:SS or H:MM:SS (for very long levels). */
export function formatClock(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(sec)}`;
  return `${m}:${pad(sec)}`;
}

/** Number with thousands separators (e.g. 10000 → "10,000"). */
export function formatNum(n: number): string {
  return n.toLocaleString('en-US');
}
