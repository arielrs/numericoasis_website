// Fullscreen (presentation) mode + Screen Wake Lock, with graceful fallbacks.

let appEl: HTMLElement | null = null;
let faux = false;
let idleTimer: number | null = null;
let wantWake = false;
let wakeSentinel: WakeLockSentinel | null = null;

const IDLE_MS = 3000;

type Vendor = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type VendorDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

export function init(el: HTMLElement): void {
  appEl = el;
  document.addEventListener('fullscreenchange', syncState);
  document.addEventListener('webkitfullscreenchange', syncState as EventListener);

  const wake = () => { if (isActive()) showControls(); };
  document.addEventListener('pointermove', wake);
  document.addEventListener('pointerdown', wake);
  document.addEventListener('touchstart', wake, { passive: true });
  document.addEventListener('keydown', wake);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && wantWake) void acquireWake();
  });
}

export function isActive(): boolean {
  const d = document as VendorDoc;
  return faux || document.fullscreenElement === appEl || d.webkitFullscreenElement === appEl;
}

export async function enter(): Promise<void> {
  if (!appEl || isActive()) return;
  const el = appEl as Vendor;
  try {
    if (el.requestFullscreen) await el.requestFullscreen();
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    else faux = true;
  } catch {
    faux = true; // e.g. iOS iPhone — fall back to CSS pseudo-fullscreen
  }
  syncState();
}

export async function exit(): Promise<void> {
  const d = document as VendorDoc;
  faux = false;
  try {
    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    else if (d.webkitFullscreenElement && d.webkitExitFullscreen) await d.webkitExitFullscreen();
  } catch {
    /* ignore */
  }
  syncState();
}

export function toggle(): void {
  if (isActive()) void exit();
  else void enter();
}

function syncState(): void {
  if (!appEl) return;
  const active = isActive();
  appEl.dataset.fullscreen = active ? 'true' : 'false';
  if (active) showControls();
  else {
    appEl.dataset.controlsHidden = 'false';
    if (idleTimer) { window.clearTimeout(idleTimer); idleTimer = null; }
  }
}

function showControls(): void {
  if (!appEl) return;
  appEl.dataset.controlsHidden = 'false';
  if (idleTimer) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (appEl && isActive()) appEl.dataset.controlsHidden = 'true';
  }, IDLE_MS);
}

// ---- Wake Lock --------------------------------------------------------

export async function acquireWake(): Promise<void> {
  wantWake = true;
  if (!('wakeLock' in navigator)) return;
  try {
    wakeSentinel = await navigator.wakeLock.request('screen');
    wakeSentinel.addEventListener('release', () => { wakeSentinel = null; });
  } catch {
    /* user agent refused (e.g. low battery) — ignore */
  }
}

export async function releaseWake(): Promise<void> {
  wantWake = false;
  try { await wakeSentinel?.release(); } catch { /* ignore */ }
  wakeSentinel = null;
}

export function wakeLockSupported(): boolean {
  return 'wakeLock' in navigator;
}
