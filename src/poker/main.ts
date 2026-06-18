// Boot + cross-cutting wiring: connect the store to render, audio, themes,
// fullscreen/wake-lock, and global keyboard shortcuts.

import * as audio from './audio';
import { clamp } from './clock';
import * as fs from './fullscreen';
import * as render from './render';
import { store } from './store';
import { applyPalette } from './palette';

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || el.isContentEditable;
}

function onKey(e: KeyboardEvent): void {
  // Escape always closes the topmost overlay / exits fullscreen.
  if (e.key === 'Escape') {
    if (fs.isActive() || render.anyOverlayOpen()) { e.preventDefault(); render.closeTopmost(); }
    return;
  }
  // Let inputs and native button activation behave normally.
  if (isTyping(e.target)) return;
  if ((e.target as HTMLElement)?.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return;

  const t = store.getState().timer;
  const s = store.getState().settings;

  switch (e.key) {
    case ' ':
    case 'k':
    case 'K':
      e.preventDefault();
      render.playPause();
      break;
    case 'ArrowLeft':
      e.preventDefault(); store.prev(); break;
    case 'ArrowRight':
      e.preventDefault(); store.next(); break;
    case 'ArrowUp':
      e.preventDefault(); setVolume(s.volume + 0.05); break;
    case 'ArrowDown':
      e.preventDefault(); setVolume(s.volume - 0.05); break;
    case 'j': case 'J':
      e.preventDefault(); store.seek(t.remainingSec - 30, true); break;
    case 'l': case 'L':
      e.preventDefault(); store.seek(t.remainingSec + 30, true); break;
    case 'r': case 'R':
      store.restartLevel(); break;
    case 'f': case 'F':
      fs.toggle(); break;
    case 'm': case 'M':
      store.setSetting('muted', !s.muted); audio.syncSettings(); break;
    case 'e': case 'E':
      render.openEditor(); break;
    case ',':
      render.openSheet(); break;
    case '?':
      render.openHelp(); break;
    default:
      break;
  }
}

function setVolume(v: number): void {
  const clamped = clamp(Number(v.toFixed(2)), 0, 1);
  store.setSetting('volume', clamped);
  audio.setVolume(clamped);
}

export function boot(): void {
  store.init();
  const s0 = store.getState();
  applyPalette(s0.settings.palette);
  render.mount();
  render.update(s0);

  // Re-apply audio gain and re-render on every state change. (The palette is
  // applied on change by the settings handlers, not every tick.)
  store.subscribe((s) => {
    audio.syncSettings();
    render.update(s);
  });

  // Domain side-effects.
  store.on('level:end', () => audio.playEnd());
  store.on('level:warning60', () => audio.playWarning());
  store.on('running', () => { if (store.getState().settings.keepAwake) void fs.acquireWake(); });
  store.on('paused', () => void fs.releaseWake());
  store.on('finished', () => void fs.releaseWake());
  store.on('stopped', () => void fs.releaseWake());

  // Unlock audio + warm a saved custom sound on the first user gesture.
  audio.attachUnlock();
  const warm = () => {
    audio.warmCustom();
    window.removeEventListener('pointerdown', warm, true);
    window.removeEventListener('keydown', warm, true);
  };
  window.addEventListener('pointerdown', warm, true);
  window.addEventListener('keydown', warm, true);

  document.addEventListener('keydown', onKey);
}
