// Palette → token derivation. Five user-chosen colours (bg/text/primary/accent/
// muted) drive every CSS custom property the UI uses. All maths in OKLCH so
// lightness nudges stay perceptually even. No dependencies.

import type { Palette, SavedPalette } from './types';

// ---- hex <-> OKLCH ----------------------------------------------------

function clamp01(n: number): number { return Math.min(1, Math.max(0, n)); }

export function isHex(s: string): boolean {
  if (typeof s !== 'string') return false;
  const t = s.trim();
  return /^#?[0-9a-fA-F]{6}$/.test(t) || /^#?[0-9a-fA-F]{3}$/.test(t);
}

export function normalizeHex(s: string): string {
  let h = (s || '').trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return '#000000';
  return '#' + h.toLowerCase();
}

function hexToRgb(hex: string): [number, number, number] {
  const h = normalizeHex(hex).slice(1);
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const f = (n: number) => Math.round(clamp01(n) * 255).toString(16).padStart(2, '0');
  return '#' + f(r) + f(g) + f(b);
}

const toLin = (c: number): number => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number): number => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

interface OKLCH { L: number; C: number; h: number; }

function hexToOklch(hex: string): OKLCH {
  let [r, g, b] = hexToRgb(hex);
  r = toLin(r); g = toLin(g); b = toLin(b);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
  return { L, C: Math.hypot(a, bb), h: Math.atan2(bb, a) };
}

function oklchToHex(o: OKLCH): string {
  const a = o.C * Math.cos(o.h);
  const b = o.C * Math.sin(o.h);
  const l_ = o.L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = o.L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = o.L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return rgbToHex(toSrgb(r), toSrgb(g), toSrgb(bl));
}

// ---- derivation helpers ----------------------------------------------

function lightenL(hex: string, dL: number): string {
  const o = hexToOklch(hex);
  return oklchToHex({ ...o, L: clamp01(o.L + dL) });
}

function mix(a: string, b: string, t: number): string {
  const A = hexToOklch(a), B = hexToOklch(b);
  // interpolate in oklab space (handle hue via a/b components)
  const aa = A.C * Math.cos(A.h), ab = A.C * Math.sin(A.h);
  const ba = B.C * Math.cos(B.h), bb = B.C * Math.sin(B.h);
  const L = A.L + (B.L - A.L) * t;
  const ra = aa + (ba - aa) * t;
  const rb = ab + (bb - ab) * t;
  return oklchToHex({ L, C: Math.hypot(ra, rb), h: Math.atan2(rb, ra) });
}

function relLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

/** Readable black/white ink for text drawn on `hex`. */
export function pickInk(hex: string): string {
  return relLuminance(hex) > 0.42 ? '#11110f' : '#ffffff';
}

const TOKEN_ORDER = [
  '--bg', '--surface', '--surface-raised', '--text', '--text-muted',
  '--primary', '--primary-contrast', '--accent', '--border', '--focus-ring',
  '--felt', '--felt-2', '--felt-line', '--felt-ink', '--felt-ink-muted',
  '--clock-ink', '--success', '--danger', '--shadow-rgb',
] as const;

export function deriveTokens(p: Palette): Record<string, string> {
  const bg = normalizeHex(p.bg);
  const text = normalizeHex(p.text);
  const primary = normalizeHex(p.primary);
  const accent = normalizeHex(p.accent);
  const muted = normalizeHex(p.muted);
  const lightBg = relLuminance(bg) > 0.5; // light themes lighten the other way

  return {
    '--bg': bg,
    '--surface': lightenL(bg, lightBg ? -0.035 : 0.045),
    '--surface-raised': lightenL(bg, lightBg ? -0.07 : 0.085),
    '--text': text,
    '--text-muted': muted,
    '--primary': primary,
    '--primary-contrast': pickInk(primary),
    '--accent': accent,
    '--border': mix(muted, bg, 0.55),
    '--focus-ring': lightenL(accent, 0.06),
    '--felt': lightenL(bg, lightBg ? -0.02 : 0.028),
    '--felt-2': bg,
    '--felt-line': mix(muted, bg, 0.45),
    '--felt-ink': text,
    '--felt-ink-muted': mix(text, bg, 0.42),
    '--clock-ink': accent,
    '--success': '#36b37e',
    '--danger': '#e5484d',
    '--shadow-rgb': lightBg ? '30 41 59' : '0 0 0',
  };
}

export function applyPalette(p: Palette, persistTokens = true): void {
  const tokens = deriveTokens(p);
  const root = document.documentElement;
  for (const k of TOKEN_ORDER) root.style.setProperty(k, tokens[k]);
  let tag = document.querySelector('meta[name="theme-color"]');
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'theme-color'); document.head.appendChild(tag); }
  tag.setAttribute('content', tokens['--bg']);
  root.style.colorScheme = relLuminance(tokens['--bg']) > 0.5 ? 'light' : 'dark';
  // Snapshot tokens for the pre-paint bootstrap (skip during live drag to avoid write spam).
  if (persistTokens) {
    try { localStorage.setItem('oliclub.tokens', JSON.stringify(tokens)); } catch { /* ignore */ }
  }
}

export function palettesEqual(a: Palette, b: Palette): boolean {
  return (['bg', 'text', 'primary', 'accent', 'muted'] as const).every((k) => normalizeHex(a[k]) === normalizeHex(b[k]));
}

// ---- built-in presets -------------------------------------------------

export interface PresetMeta { id: string; name: string; palette: Palette; }

export const PRESETS: PresetMeta[] = [
  { id: 'oliclub', name: 'Oliclub', palette: { bg: '#0a0a0b', text: '#ededee', primary: '#b3122b', accent: '#edc02a', muted: '#7a7d82' } },
  { id: 'vegas', name: 'Vegas Felt', palette: { bg: '#0c2a1c', text: '#f3ead2', primary: '#c0392b', accent: '#e3b94f', muted: '#6f8a78' } },
  { id: 'royale', name: 'Royale', palette: { bg: '#150d22', text: '#f0ecf6', primary: '#7a3fb8', accent: '#e0b94a', muted: '#7d7390' } },
  { id: 'baize', name: 'Midnight Baize', palette: { bg: '#0a1f24', text: '#eef3ec', primary: '#1f9e8a', accent: '#e6cf86', muted: '#6f8a86' } },
];

export function defaultPalette(): Palette {
  return { ...PRESETS[0].palette };
}

export function validPalette(v: unknown): v is Palette {
  if (!v || typeof v !== 'object') return false;
  const p = v as Record<string, unknown>;
  return (['bg', 'text', 'primary', 'accent', 'muted'] as const).every((k) => typeof p[k] === 'string' && isHex(p[k] as string));
}

export function validSavedPalettes(v: unknown): SavedPalette[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is SavedPalette =>
    !!x && typeof x === 'object' && typeof (x as SavedPalette).id === 'string'
    && typeof (x as SavedPalette).name === 'string' && validPalette((x as SavedPalette).palette));
}
