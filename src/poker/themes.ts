// Theme metadata + apply/persist. The pre-paint bootstrap in poker.astro already
// set <html data-theme> from localStorage; this keeps it in sync at runtime and
// updates the browser chrome colour.

import type { ThemeId } from './types';

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  /** theme-color meta (browser chrome) — approximate of --bg */
  chrome: string;
  /** three representative swatch colours for the picker preview */
  swatch: [string, string, string];
}

export const THEMES: ThemeMeta[] = [
  { id: 'midnight-felt', name: 'Midnight Felt', chrome: '#15171c', swatch: ['#15171c', '#2f6b4f', '#e0ad57'] },
  { id: 'casino-classic', name: 'Casino Classic', chrome: '#1f3a2a', swatch: ['#1f3a2a', '#3f8a5c', '#caa24a'] },
  { id: 'oled-contrast', name: 'OLED Contrast', chrome: '#000000', swatch: ['#000000', '#19c98a', '#3fd0e6'] },
  { id: 'amber-warm', name: 'Amber Warm', chrome: '#231d12', swatch: ['#231d12', '#caa24a', '#d8843e'] },
  { id: 'slate-cool', name: 'Slate Cool', chrome: '#1e2530', swatch: ['#1e2530', '#3aa6c9', '#54c0d0'] },
  { id: 'paper-light', name: 'Paper Light', chrome: '#f3eee1', swatch: ['#f3eee1', '#3f8a5c', '#3a5fa6'] },
];

const VALID = new Set<string>(THEMES.map((t) => t.id));

export function isThemeId(v: string): v is ThemeId {
  return VALID.has(v);
}

export function applyTheme(theme: ThemeId): void {
  const root = document.documentElement;
  if (root.getAttribute('data-theme') !== theme) {
    root.setAttribute('data-theme', theme);
  }
  const meta = THEMES.find((t) => t.id === theme);
  if (meta) {
    let tag = document.querySelector('meta[name="theme-color"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'theme-color');
      document.head.appendChild(tag);
    }
    if (tag.getAttribute('content') !== meta.chrome) tag.setAttribute('content', meta.chrome);
  }
}
