// Web Audio engine. Synthesises six loud end-of-level presets entirely in-browser
// (no files), plus playback of a user-uploaded custom sound persisted in IndexedDB.
// Everything routes through one master gain so volume/mute apply uniformly.

import { store } from './store';
import * as storage from './storage';

export interface SoundOption { id: string; name: string; }

export const SOUND_PRESETS: SoundOption[] = [
  { id: 'air-horn', name: 'Air Horn' },
  { id: 'vuvuzela', name: 'Vuvuzela' },
  { id: 'casino-bell', name: 'Casino Bell' },
  { id: 'buzzer', name: 'Buzzer' },
  { id: 'chime', name: 'Chime' },
  { id: 'alarm', name: 'Alarm' },
];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let customBuffer: AudioBuffer | null = null;
let customId: string | null = null;
let unlockAttached = false;

const MAX_BYTES = 5 * 1024 * 1024;

function vol(): number {
  const s = store.getState().settings;
  return s.muted ? 0 : s.volume;
}

export function ensureAudio(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = vol();
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Resume the AudioContext on the first user gesture (autoplay policy). */
export function attachUnlock(): void {
  if (unlockAttached) return;
  unlockAttached = true;
  const handler = () => {
    ensureAudio();
    window.removeEventListener('pointerdown', handler, true);
    window.removeEventListener('keydown', handler, true);
  };
  window.addEventListener('pointerdown', handler, true);
  window.addEventListener('keydown', handler, true);
}

export function setVolume(v: number): void {
  if (master && ctx) master.gain.setTargetAtTime(store.getState().settings.muted ? 0 : v, ctx.currentTime, 0.01);
}
/** Re-read volume/mute from the store and apply to the master gain. */
export function syncSettings(): void {
  if (master && ctx) master.gain.setTargetAtTime(vol(), ctx.currentTime, 0.01);
}

// ---- triggers ---------------------------------------------------------

export function playEnd(): void {
  if (!store.getState().settings.soundEnabled) return;
  playSelected();
}

export function playWarning(): void {
  const s = store.getState().settings;
  if (!s.soundEnabled || !s.warn60) return;
  const c = ensureAudio();
  if (!c || !master) return;
  warningCue(c, master, c.currentTime);
}

/** Test button: always plays the selected sound (and unlocks audio). */
export function preview(): void {
  playSelected();
}

function playSelected(): void {
  const c = ensureAudio();
  if (!c || !master) return;
  const sound = store.getState().settings.sound;
  if (sound.startsWith('custom:')) {
    const id = sound.slice('custom:'.length);
    if (customBuffer && customId === id) {
      playBuffer(c, master, customBuffer);
    } else {
      void loadCustom(id).then((buf) => {
        if (buf && master && c) playBuffer(c, master, buf);
        else fallbackPreset(c, master!);
      });
    }
    return;
  }
  const fn = PRESETS[sound] ?? PRESETS['air-horn'];
  fn(c, master, c.currentTime);
}

function fallbackPreset(c: AudioContext, out: GainNode): void {
  PRESETS['air-horn'](c, out, c.currentTime);
}

function playBuffer(c: AudioContext, out: GainNode, buf: AudioBuffer): void {
  const src = c.createBufferSource();
  src.buffer = buf;
  src.connect(out);
  src.start();
}

// ---- custom upload ----------------------------------------------------

export interface UploadResult { ok: true; id: string; name: string }
export interface UploadError { ok: false; error: string }

export async function uploadFile(file: File): Promise<UploadResult | UploadError> {
  if (!file.type.startsWith('audio/')) return { ok: false, error: 'That file is not an audio file.' };
  if (file.size > MAX_BYTES) return { ok: false, error: 'File is too large (max 5 MB).' };
  const c = ensureAudio();
  if (!c) return { ok: false, error: 'Audio is not supported in this browser.' };
  let arr: ArrayBuffer;
  try {
    arr = await file.arrayBuffer();
  } catch {
    return { ok: false, error: 'Could not read that file.' };
  }
  // decodeAudioData detaches the buffer — keep a copy for storage.
  const forStore = arr.slice(0);
  let buf: AudioBuffer;
  try {
    buf = await c.decodeAudioData(arr);
  } catch {
    return { ok: false, error: 'Unsupported audio format (try MP3, WAV or OGG).' };
  }
  const id = `${Date.now().toString(36)}-${Math.round(buf.duration * 1000)}`;
  try {
    await storage.putSound({ id, name: file.name, mime: file.type, size: file.size, blob: new Blob([forStore], { type: file.type }) });
  } catch {
    // Couldn't persist — still usable this session.
  }
  customBuffer = buf;
  customId = id;
  return { ok: true, id, name: file.name };
}

async function loadCustom(id: string): Promise<AudioBuffer | null> {
  const c = ensureAudio();
  if (!c) return null;
  try {
    const rec = await storage.getSound(id);
    if (!rec) return null;
    const arr = await rec.blob.arrayBuffer();
    const buf = await c.decodeAudioData(arr);
    customBuffer = buf;
    customId = id;
    return buf;
  } catch {
    return null;
  }
}

export async function getCustomMeta(id: string): Promise<{ name: string } | null> {
  try {
    const rec = await storage.getSound(id);
    return rec ? { name: rec.name } : null;
  } catch {
    return null;
  }
}

export async function removeCustom(id: string): Promise<void> {
  try { await storage.deleteSound(id); } catch { /* ignore */ }
  if (customId === id) { customBuffer = null; customId = null; }
}

/** Pre-decode the selected custom sound at startup (after a gesture). */
export function warmCustom(): void {
  const sound = store.getState().settings.sound;
  if (sound.startsWith('custom:')) void loadCustom(sound.slice('custom:'.length));
}

// =====================================================================
// Synthesis recipes
// =====================================================================

type Preset = (c: AudioContext, out: GainNode, t0: number) => void;

function osc(c: AudioContext, type: OscillatorType, freq: number, detune = 0): OscillatorNode {
  const o = c.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = detune;
  return o;
}

function makeDistortion(c: AudioContext, drive: number): WaveShaperNode {
  const ws = c.createWaveShaper();
  const n = 256;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = Math.tanh(drive * x);
  }
  ws.curve = curve;
  ws.oversample = '2x';
  return ws;
}

const airHorn: Preset = (c, out, t0) => {
  const dur = 1.85;
  const env = c.createGain();
  const lpf = c.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 3500; lpf.Q.value = 1;
  lpf.connect(env); env.connect(out);

  const oscs = [
    osc(c, 'sawtooth', 233, 0),
    osc(c, 'sawtooth', 233, 7),
    osc(c, 'sawtooth', 233, -7),
    osc(c, 'sawtooth', 466, 0),
  ];
  // honk layer
  const honk = osc(c, 'square', 233);
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 3;
  const honkGain = c.createGain(); honkGain.gain.value = 0.5;
  honk.connect(bp); bp.connect(honkGain); honkGain.connect(env);

  // waver LFO
  const lfo = osc(c, 'sine', 6);
  const lfoGain = c.createGain(); lfoGain.gain.value = 8;
  lfo.connect(lfoGain);

  oscs.forEach((o) => { o.connect(lpf); lfoGain.connect(o.detune); });
  lfoGain.connect(honk.detune);

  env.gain.setValueAtTime(0.0001, t0);
  env.gain.linearRampToValueAtTime(0.85, t0 + 0.03);
  env.gain.setValueAtTime(0.85, t0 + 0.66);
  env.gain.linearRampToValueAtTime(0.0001, t0 + 0.72);
  env.gain.linearRampToValueAtTime(0.85, t0 + 0.80);
  env.gain.setValueAtTime(0.85, t0 + dur - 0.2);
  env.gain.linearRampToValueAtTime(0.0001, t0 + dur);

  [...oscs, honk, lfo].forEach((o) => { o.start(t0); o.stop(t0 + dur + 0.05); });
};

const vuvuzela: Preset = (c, out, t0) => {
  const dur = 2.2;
  const env = c.createGain();
  const bp1 = c.createBiquadFilter(); bp1.type = 'bandpass'; bp1.frequency.value = 750; bp1.Q.value = 5;
  const bp2 = c.createBiquadFilter(); bp2.type = 'bandpass'; bp2.frequency.value = 2500; bp2.Q.value = 8;
  const shaper = makeDistortion(c, 6);
  bp1.connect(bp2); bp2.connect(shaper); shaper.connect(env); env.connect(out);

  const base = osc(c, 'sawtooth', 247);
  const buzz = osc(c, 'square', 247);
  const buzzGain = c.createGain(); buzzGain.gain.value = 0.35;
  base.connect(bp1); buzz.connect(buzzGain); buzzGain.connect(bp1);

  const lfo = osc(c, 'sine', 4.5);
  const lfoGain = c.createGain(); lfoGain.gain.value = 11;
  lfo.connect(lfoGain); lfoGain.connect(base.detune); lfoGain.connect(buzz.detune);

  env.gain.setValueAtTime(0.0001, t0);
  env.gain.linearRampToValueAtTime(0.8, t0 + 0.12);
  env.gain.setValueAtTime(0.8, t0 + dur - 0.3);
  env.gain.linearRampToValueAtTime(0.0001, t0 + dur);

  [base, buzz, lfo].forEach((o) => { o.start(t0); o.stop(t0 + dur + 0.05); });
};

const casinoBell: Preset = (c, out, t0) => {
  const partials = [1, 2.76, 5.40, 8.93];
  const gains = [1, 0.5, 0.32, 0.2];
  const f0 = 660;
  const strikes = [0, 0.18, 0.36];
  strikes.forEach((st, si) => {
    const start = t0 + st;
    const amp = si === 0 ? 1 : 0.7 - si * 0.12;
    partials.forEach((p, i) => {
      const o = osc(c, 'sine', f0 * p);
      const g = c.createGain();
      const peak = 0.5 * gains[i] * amp;
      const decay = 1.4 / (1 + i * 0.6);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.linearRampToValueAtTime(peak, start + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, start + decay);
      o.connect(g); g.connect(out);
      o.start(start); o.stop(start + decay + 0.05);
    });
  });
};

const buzzer: Preset = (c, out, t0) => {
  const dur = 1.3;
  const env = c.createGain();
  const shaper = makeDistortion(c, 50);
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 800; bp.Q.value = 1;
  shaper.connect(bp); bp.connect(env); env.connect(out);

  const a = osc(c, 'sawtooth', 120);
  const b = osc(c, 'square', 180);
  a.connect(shaper); b.connect(shaper);

  const lfo = osc(c, 'square', 22);
  const lfoGain = c.createGain(); lfoGain.gain.value = 0.32;
  const lfoBias = c.createConstantSource(); lfoBias.offset.value = 0.53;
  lfo.connect(lfoGain); lfoGain.connect(env.gain); lfoBias.connect(env.gain);

  env.gain.setValueAtTime(0.0001, t0);
  env.gain.linearRampToValueAtTime(0.85, t0 + 0.01);
  env.gain.setValueAtTime(0.85, t0 + dur - 0.08);
  env.gain.linearRampToValueAtTime(0.0001, t0 + dur);

  [a, b, lfo].forEach((o) => { o.start(t0); o.stop(t0 + dur + 0.05); });
  lfoBias.start(t0); lfoBias.stop(t0 + dur + 0.05);
};

const chime: Preset = (c, out, t0) => {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  const delay = c.createDelay(); delay.delayTime.value = 0.09;
  const fb = c.createGain(); fb.gain.value = 0.25;
  const wet = c.createGain(); wet.gain.value = 0.5;
  delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(out);

  notes.forEach((f, i) => {
    const start = t0 + i * 0.15;
    const o = osc(c, 'sine', f);
    const o2 = osc(c, 'triangle', f * 2);
    const g = c.createGain();
    const g2 = c.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(0.5, start + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
    g2.gain.setValueAtTime(0.0001, start);
    g2.gain.linearRampToValueAtTime(0.12, start + 0.008);
    g2.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);
    o.connect(g); g.connect(out); g.connect(delay);
    o2.connect(g2); g2.connect(out);
    o.start(start); o.stop(start + 1.3);
    o2.start(start); o2.stop(start + 0.9);
  });
};

const alarm: Preset = (c, out, t0) => {
  const dur = 2.4;
  const env = c.createGain();
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1000; bp.Q.value = 2;
  bp.connect(env); env.connect(out);
  const o = osc(c, 'sawtooth', 800);
  o.connect(bp);
  let t = t0;
  let hi = false;
  while (t < t0 + dur) {
    o.frequency.setValueAtTime(hi ? 1000 : 800, t);
    hi = !hi;
    t += 0.22;
  }
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.linearRampToValueAtTime(0.82, t0 + 0.02);
  env.gain.setValueAtTime(0.82, t0 + dur - 0.15);
  env.gain.linearRampToValueAtTime(0.0001, t0 + dur);
  o.start(t0); o.stop(t0 + dur + 0.05);
};

const warningCue = (c: AudioContext, out: GainNode, t0: number): void => {
  // softer, distinct two-note cue
  [880, 1175].forEach((f, i) => {
    const start = t0 + i * 0.16;
    const o = osc(c, 'sine', f);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(0.4, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
    o.connect(g); g.connect(out);
    o.start(start); o.stop(start + 0.36);
  });
};

const PRESETS: Record<string, Preset> = {
  'air-horn': airHorn,
  vuvuzela,
  'casino-bell': casinoBell,
  buzzer,
  chime,
  alarm,
};
