// DOM rendering + event wiring. Builds the whole UI once into #app, then mutates
// it on each store notification. The editor table is rebuilt only when the entry
// list's shape changes (so typing in a cell never loses focus).

import * as audio from './audio';
import { formatClock, formatNum } from './clock';
import { LEVEL_SECONDS, newBlind, newBreak } from './defaults';
import * as fs from './fullscreen';
import { icon } from './icons';
import { applyPalette, isHex, normalizeHex, palettesEqual, pickInk, PRESETS } from './palette';
import * as storage from './storage';
import {
  blindNumber, currentEntry, isBreak, nextEntry, progressFraction,
  resumingBlindNumber, totalBlinds,
} from './selectors';
import { store } from './store';
import type { AppState, ChipDef, LevelEntry, Palette } from './types';
import { SOUND_PRESETS } from './audio';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;

let app: HTMLElement;
let structureSig = '';
let chipDisplaySig = '';
let chipIdSig = '';
let lastAnnouncedKey = '';
let pendingCustom: { id: string; name: string } | null = null;
let editorTab: 'blinds' | 'chips' = 'blinds';
let seekDragging = false;
let logoUrl: string | null = null;

// ---- markup builders --------------------------------------------------

function chipStyle(color: string): string {
  return `--chip-face:${normalizeHex(color)};--chip-ink:${pickInk(color)}`;
}

function chipRowsHTML(chips: ChipDef[]): string {
  return chips.map(
    (c) => `
    <div class="legend__row">
      <dt aria-label="Chip worth ${formatNum(c.value)}"><span class="chip" style="${chipStyle(c.color)}"></span></dt>
      <dd>${formatNum(c.value)}</dd>
    </div>`,
  ).join('');
}

function fsChipsHTML(chips: ChipDef[]): string {
  return chips.map(
    (c) => `<span class="fs-chip" aria-label="Chip ${c.value}"><span class="chip" style="${chipStyle(c.color)}"></span><b class="num">${formatNum(c.value)}</b></span>`,
  ).join('');
}

const PAL_ROLES: ReadonlyArray<[keyof Palette, string]> = [
  ['bg', 'Background'], ['text', 'Text'], ['primary', 'Primary'], ['accent', 'Accent'], ['muted', 'Muted'],
];

function paletteRowsHTML(): string {
  return PAL_ROLES.map(
    ([key, label]) => `
    <div class="pal-row">
      <label class="pal-row__label" for="pal-${key}">${label}</label>
      <span class="pal-row__controls">
        <input type="color" id="pal-${key}" data-pal="${key}" aria-label="${label} colour" />
        <input type="text" class="pal-hex" data-palhex="${key}" aria-label="${label} hex code" spellcheck="false" maxlength="7" />
      </span>
    </div>`,
  ).join('');
}

function presetHTML(id: string, name: string, p: Palette, deletable: boolean): string {
  return `<div class="preset" data-presetwrap="${id}">
    <button type="button" class="preset__apply" data-preset="${id}" aria-pressed="false">
      <span class="preset__chips" aria-hidden="true"><span style="background:${p.bg}"></span><span style="background:${p.primary}"></span><span style="background:${p.accent}"></span></span>
      <span class="preset__name">${name}</span>
    </button>
    ${deletable ? `<button type="button" class="preset__del" data-delpreset="${id}" aria-label="Delete ${name}">${icon('close')}</button>` : ''}
  </div>`;
}

function switchHTML(id: string, label: string, hint = ''): string {
  return `
  <div class="opt-row">
    <span class="opt-row__label"><span>${label}</span>${hint ? `<span class="opt-row__hint">${hint}</span>` : ''}</span>
    <button type="button" class="switch" id="${id}" role="switch" aria-checked="false" aria-label="${label}"></button>
  </div>`;
}

function appHTML(): string {
  return `
  <div class="notice" id="notice" hidden>Storage is unavailable — settings won't be saved this session.</div>
  <header class="hdr">
    <span class="hdr__title">Oliclub Poker Timer</span>
    <span class="hdr__spacer"></span>
    <div class="hdr__actions">
      <button class="iconbtn" id="edit-btn" aria-label="Edit blind structure" title="Edit structure">${icon('edit')}</button>
      <button class="iconbtn" id="settings-btn" aria-label="Settings" title="Settings">${icon('gear')}</button>
      <button class="iconbtn" id="fs-btn" aria-label="Enter fullscreen" title="Fullscreen">${icon('expand')}</button>
    </div>
  </header>

  <div class="main">
    <img class="main__logo" id="club-logo" src="/poker/oliclub.webp" alt="Oliclub" />
    <div class="stage-col">
      <section class="stage" aria-label="Tournament timer">
        <div class="fs-level num" id="fs-level"></div>
        <div class="level-pill"><span class="level-pill__dot"></span><span id="level-text">Level 1</span></div>

        <div class="clock-wrap">
          <div class="clock" id="clock" aria-hidden="true"><span id="clk-pre">0</span><span class="clock__colon">:</span><span id="clk-post">00</span></div>
          <span class="paused-tag">Paused</span>
        </div>

        <div class="progress"><div class="progress__fill" id="progress-fill"></div></div>

        <div class="blinds" id="blinds">
          <div class="blind"><span class="blind__label">Small Blind</span><span class="blind__value num" id="sb">0</span></div>
          <div class="blind"><span class="blind__label">Big Blind</span><span class="blind__value num" id="bb">0</span></div>
          <div class="blind blind--ante" id="ante-block"><span class="blind__label">Ante</span><span class="blind__value num" id="ante">0</span></div>
        </div>

        <div class="break-banner">
          <div class="break-banner__title">${icon('coffee')}<span id="break-title">Break</span></div>
          <div class="break-banner__sub" id="break-sub"></div>
        </div>

        <div class="nextup" id="nextup">
          <span class="nextup__label">Next</span>
          <span class="nextup__value" id="next-val">—</span>
        </div>

        <div class="fs-chips" id="fs-chips" aria-hidden="true"></div>
      </section>

      <div class="seek">
        <span class="seek__time num" id="seek-start">0:00</span>
        <input class="range" type="range" id="seek" min="0" max="${LEVEL_SECONDS}" value="${LEVEL_SECONDS}" step="1"
               aria-label="Seek within current level" />
        <span class="seek__time seek__time--end num" id="seek-end">12:00</span>
      </div>

      <div class="transport">
        <button class="btn btn--ghost" id="prev" aria-label="Previous level">${icon('prev')}<span class="btn__txt">Prev</span></button>
        <button class="btn btn--ghost" id="restart" aria-label="Restart this level">${icon('restart')}<span class="btn__txt">Restart</span></button>
        <button class="btn btn--primary" id="playpause" aria-label="Play" aria-pressed="false">${icon('play')}<span class="btn__txt">Play</span></button>
        <button class="btn btn--ghost" id="next" aria-label="Next level">${icon('next')}<span class="btn__txt">Next</span></button>
      </div>
    </div>

    <aside class="legend" id="legend">
      <div class="legend__title"><span class="eyebrow">Chip values</span></div>
      <dl class="legend__list" id="legend-list"></dl>
    </aside>
  </div>

  <!-- Fullscreen floating control bar -->
  <div class="fs-bar" role="group" aria-label="Timer controls">
    <button class="iconbtn" id="fs-restart" aria-label="Restart this level">${icon('restart')}</button>
    <button class="iconbtn" id="fs-prev" aria-label="Previous level">${icon('prev')}</button>
    <button class="btn btn--primary" id="fs-playpause" aria-label="Play">${icon('play')}</button>
    <button class="iconbtn" id="fs-next" aria-label="Next level">${icon('next')}</button>
    <button class="iconbtn" id="fs-settings" aria-label="Settings">${icon('gear')}</button>
    <button class="iconbtn" id="fs-exit" aria-label="Exit fullscreen">${icon('collapse')}</button>
  </div>

  <div class="visually-hidden" id="live" aria-live="polite" role="status"></div>

  <!-- Options slide-over -->
  <div class="scrim" id="scrim" hidden></div>
  <aside class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" hidden>
    <div class="sheet__head">
      <h2 id="sheet-title">Settings</h2>
      <button class="iconbtn" id="sheet-close" aria-label="Close settings">${icon('close')}</button>
    </div>
    <div class="sheet__body">
      <div class="opt-group">
        <span class="eyebrow">Sound</span>
        ${switchHTML('set-soundEnabled', 'End-of-level alarm')}
        <div class="opt-row opt-row--stack">
          <span class="opt-row__label"><span>Sound</span></span>
          <select id="sound-select" aria-label="Alarm sound"></select>
        </div>
        <div class="opt-row">
          <button class="btn btn--ghost" id="upload-btn">${icon('upload')}<span>Upload custom…</span></button>
          <button class="btn btn--ghost" id="test-btn" aria-label="Test sound">${icon('sound')}<span>Test</span></button>
        </div>
        <input type="file" id="sound-file" accept="audio/*" class="visually-hidden" />
        <div class="opt-row opt-row--stack">
          <span class="opt-row__label"><span>Volume</span></span>
          <div class="vol"><input class="range" type="range" id="vol" min="0" max="100" value="85" aria-label="Volume" /><span class="num" id="vol-val">85%</span></div>
        </div>
        ${switchHTML('set-warn60', 'Warning at 1:00 left', 'A softer cue one minute before time')}
      </div>

      <div class="opt-group">
        <span class="eyebrow">Theme colours</span>
        <div class="palette" id="palette">${paletteRowsHTML()}</div>
        <div class="opt-row opt-row--stack">
          <span class="opt-row__label"><span>Quick themes</span></span>
          <div class="presets" id="presets"></div>
          <button class="btn btn--ghost" id="save-palette">${icon('plus')}<span>Save current colours…</span></button>
        </div>
      </div>

      <div class="opt-group">
        <span class="eyebrow">Display</span>
        ${switchHTML('set-flashLast60', 'Flash the clock in the final minute')}
        ${switchHTML('set-showChips', 'Show chip values')}
        ${switchHTML('set-autoFullscreen', 'Go fullscreen when I press play')}
        ${switchHTML('set-keepAwake', 'Keep the screen awake while running')}
        ${switchHTML('set-resumeRunningOnReload', 'Keep running after a page reload', 'Off = pause on reload (safer)')}
      </div>

      <div class="opt-group">
        <span class="eyebrow">Logo</span>
        ${switchHTML('set-showLogo', 'Show club logo')}
        ${switchHTML('set-logoFullscreen', 'Show logo in fullscreen')}
        <div class="opt-row">
          <button class="btn btn--ghost" id="logo-upload-btn">${icon('upload')}<span>Replace logo…</span></button>
          <button class="btn btn--ghost" id="logo-reset-btn">${icon('restart')}<span>Reset</span></button>
        </div>
        <input type="file" id="logo-file" accept="image/*" class="visually-hidden" />
      </div>

      <div class="opt-group">
        <button class="btn btn--ghost" id="help-btn">${icon('keyboard')}<span>Keyboard shortcuts</span></button>
      </div>
    </div>
  </aside>

  <!-- Editor -->
  <section class="editor" id="editor" role="dialog" aria-modal="true" aria-labelledby="editor-title">
    <div class="editor__head">
      <h2 id="editor-title">Structure</h2>
      <div class="tabs" role="tablist" aria-label="Structure tabs">
        <button class="tab" id="tab-blinds" role="tab" aria-selected="true">Blinds</button>
        <button class="tab" id="tab-chips" role="tab" aria-selected="false">Chips</button>
      </div>
      <span class="hdr__spacer"></span>
      <button class="btn btn--primary" id="editor-done">Done</button>
    </div>
    <div class="editor__body">
      <div id="panel-blinds" role="tabpanel" aria-labelledby="tab-blinds">
        <table class="editor__table">
          <thead>
            <tr><th>Order</th><th>Level</th><th>Small</th><th>Big</th><th>Ante</th><th>Minutes</th><th></th></tr>
          </thead>
          <tbody id="editor-rows"></tbody>
        </table>
      </div>
      <div id="panel-chips" role="tabpanel" aria-labelledby="tab-chips" hidden>
        <div class="chip-editor" id="chip-rows"></div>
        <p class="chip-editor__hint">These colours and values appear on the timer's chip legend.</p>
      </div>
    </div>
    <div class="editor__foot">
      <span class="foot-group" id="foot-blinds">
        <button class="btn btn--ghost" id="add-level">${icon('plus')}<span>Add level</span></button>
        <button class="btn btn--ghost" id="add-break">${icon('coffee')}<span>Add break</span></button>
        <button class="btn btn--ghost" id="editor-reset">${icon('restart')}<span>Reset levels</span></button>
      </span>
      <span class="foot-group" id="foot-chips" hidden>
        <button class="btn btn--ghost" id="add-chip">${icon('plus')}<span>Add chip</span></button>
      </span>
      <span class="spacer"></span>
      <span class="saved-flag" id="saved-flag">${icon('check')}<span>Saved</span></span>
      <span class="num" id="level-count"></span>
    </div>
  </section>

  <!-- Help modal -->
  <div class="modal" id="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
    <div class="modal__card">
      <div class="modal__head"><h2 id="help-title">Keyboard shortcuts</h2><button class="iconbtn" id="help-close" aria-label="Close">${icon('close')}</button></div>
      <div class="modal__body">
        <div class="kbd-list">
          ${[
            ['Space / K', 'Play / Pause'],
            ['← / →', 'Previous / Next level'],
            ['↑ / ↓', 'Volume up / down'],
            ['J / L', 'Seek −30s / +30s'],
            ['R', 'Restart level'],
            ['F', 'Fullscreen'],
            ['M', 'Mute'],
            ['E', 'Edit structure'],
            [', (comma)', 'Settings'],
            ['?', 'This help'],
            ['Esc', 'Exit fullscreen / close'],
          ].map(([k, d]) => `<div class="kbd-row"><span>${d}</span><kbd>${k}</kbd></div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm modal -->
  <div class="modal" id="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
    <div class="modal__card">
      <div class="modal__head"><h2 id="confirm-title">Are you sure?</h2></div>
      <div class="modal__body"><p id="confirm-msg"></p></div>
      <div class="modal__actions">
        <button class="btn btn--ghost" id="confirm-cancel">Cancel</button>
        <button class="btn btn--primary" id="confirm-ok">Confirm</button>
      </div>
    </div>
  </div>

  <!-- Prompt modal (name a palette) -->
  <div class="modal" id="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="prompt-title">
    <div class="modal__card">
      <div class="modal__head"><h2 id="prompt-title">Save palette</h2></div>
      <div class="modal__body"><input type="text" class="field" id="prompt-input" maxlength="40" placeholder="Name this palette" /></div>
      <div class="modal__actions">
        <button class="btn btn--ghost" id="prompt-cancel">Cancel</button>
        <button class="btn btn--primary" id="prompt-ok">Save</button>
      </div>
    </div>
  </div>

  <div class="toast-stack" id="toasts"></div>
  `;
}

// ---- overlay / focus management --------------------------------------

interface Overlay { node: HTMLElement; restore: HTMLElement | null; onClose?: () => void; }
const overlayStack: Overlay[] = [];

function focusable(node: HTMLElement): HTMLElement[] {
  return Array.from(
    node.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((e) => e.offsetParent !== null || e === document.activeElement);
}

function openOverlay(node: HTMLElement, onClose?: () => void): void {
  const restore = document.activeElement as HTMLElement | null;
  overlayStack.push({ node, restore, onClose });
  const first = focusable(node)[0];
  first?.focus();
}

function closeTopmost(): boolean {
  if (fs.isActive()) { void fs.exit(); return true; }
  const top = overlayStack.pop();
  if (!top) return false;
  top.onClose?.();
  top.restore?.focus?.();
  return true;
}

function anyOverlayOpen(): boolean { return overlayStack.length > 0; }

function trapTab(e: KeyboardEvent): void {
  if (e.key !== 'Tab' || overlayStack.length === 0) return;
  const { node } = overlayStack[overlayStack.length - 1];
  const items = focusable(node);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement;
  if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  else if (!node.contains(active)) { e.preventDefault(); first.focus(); }
}

// ---- toasts -----------------------------------------------------------

export function showToast(msg: string, actionLabel?: string, onAction?: () => void): void {
  const stack = $('toasts');
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.innerHTML = `<span>${msg}</span>`;
  if (actionLabel && onAction) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = actionLabel;
    b.addEventListener('click', () => { onAction(); dismiss(); });
    t.appendChild(b);
  }
  const dismiss = () => { t.remove(); window.clearTimeout(timer); };
  const timer = window.setTimeout(dismiss, 6000);
  stack.appendChild(t);
}

// ---- editor -----------------------------------------------------------

function rowHTML(entry: LevelEntry, index: number, blindNo: number, total: number): string {
  const mins = Math.round(entry.durationSec / 60);
  const up = `<button class="iconbtn" data-act="up" data-id="${entry.id}" aria-label="Move up" ${index === 0 ? 'disabled' : ''}>${icon('up')}</button>`;
  const down = `<button class="iconbtn" data-act="down" data-id="${entry.id}" aria-label="Move down">${icon('down')}</button>`;
  const actions = `<td class="row__actions">
    <button class="iconbtn" data-act="insert" data-id="${entry.id}" aria-label="Insert level below">${icon('insert')}</button>
    <button class="iconbtn" data-act="delete" data-id="${entry.id}" aria-label="Delete this entry">${icon('trash')}</button>
  </td>`;
  if (entry.kind === 'break') {
    return `<tr class="row is-break" data-id="${entry.id}">
      <td><div class="row__reorder">${up}${down}</div></td>
      <td class="row__brkcell" colspan="4">${icon('coffee')} Break</td>
      <td><input class="cellinput" type="number" inputmode="numeric" min="0" step="1" value="${mins}" data-id="${entry.id}" data-field="duration" aria-label="Break minutes" /></td>
      ${actions}
    </tr>`;
  }
  return `<tr class="row" data-id="${entry.id}">
    <td><div class="row__reorder">${up}${down}</div></td>
    <td class="row__num">${blindNo}<span class="row__now" data-now hidden>now</span></td>
    <td><input class="cellinput" type="number" inputmode="numeric" min="0" step="1" value="${entry.smallBlind}" data-id="${entry.id}" data-field="smallBlind" aria-label="Level ${blindNo} small blind" /></td>
    <td><input class="cellinput" type="number" inputmode="numeric" min="0" step="1" value="${entry.bigBlind}" data-id="${entry.id}" data-field="bigBlind" aria-label="Level ${blindNo} big blind" /><span class="cell-warn" hidden>Big blind &lt; small blind</span></td>
    <td><input class="cellinput" type="number" inputmode="numeric" min="0" step="1" value="${entry.ante}" data-id="${entry.id}" data-field="ante" aria-label="Level ${blindNo} ante" /></td>
    <td><input class="cellinput" type="number" inputmode="numeric" min="0" step="1" value="${mins}" data-id="${entry.id}" data-field="duration" aria-label="Level ${blindNo} minutes" /></td>
    ${actions}
  </tr>`;
}

function rebuildEditor(s: AppState): void {
  const tbody = $('editor-rows');
  const total = totalBlinds(s);
  let bn = 0;
  tbody.innerHTML = s.entries
    .map((e, i) => {
      if (e.kind === 'blind') bn++;
      return rowHTML(e, i, bn, total);
    })
    .join('');
  $('level-count').textContent = `${total} levels`;
  tbody.querySelectorAll<HTMLElement>('tr.row').forEach((tr) => validateBlindRow(tr));
}

function flashSaved(): void {
  const f = $('saved-flag');
  f.classList.add('is-on');
  window.clearTimeout((flashSaved as unknown as { t?: number }).t);
  (flashSaved as unknown as { t?: number }).t = window.setTimeout(() => f.classList.remove('is-on'), 1200);
}

// ---- chips ------------------------------------------------------------

function rebuildLegend(s: AppState): void {
  $('legend-list').innerHTML = chipRowsHTML(s.chips);
  $('fs-chips').innerHTML = fsChipsHTML(s.chips);
}

function chipEditRowHTML(c: ChipDef): string {
  const hex = normalizeHex(c.color);
  return `<div class="chip-edit" data-chiprow="${c.id}">
    <span class="chip chip--sm" data-chippreview style="${chipStyle(c.color)}"></span>
    <input type="color" data-chipfield="color" data-chipid="${c.id}" value="${hex}" aria-label="Chip colour" />
    <input type="text" class="pal-hex" data-chiphex data-chipid="${c.id}" value="${hex}" maxlength="7" spellcheck="false" aria-label="Chip hex code" />
    <input type="number" class="cellinput" data-chipfield="value" data-chipid="${c.id}" min="0" step="1" value="${c.value}" aria-label="Chip value" />
    <button class="iconbtn" data-chipdel="${c.id}" aria-label="Delete chip">${icon('trash')}</button>
  </div>`;
}

function rebuildChipsEditor(s: AppState): void {
  $('chip-rows').innerHTML = s.chips.map(chipEditRowHTML).join('');
}

// ---- editor tabs ------------------------------------------------------

function setEditorTab(tab: 'blinds' | 'chips'): void {
  editorTab = tab;
  const blinds = tab === 'blinds';
  $('tab-blinds').setAttribute('aria-selected', blinds ? 'true' : 'false');
  $('tab-chips').setAttribute('aria-selected', blinds ? 'false' : 'true');
  $('panel-blinds').hidden = !blinds;
  $('panel-chips').hidden = blinds;
  $('foot-blinds').hidden = !blinds;
  $('foot-chips').hidden = blinds;
}

// ---- prompt dialog ----------------------------------------------------

function openPrompt(title: string, onOk: (value: string) => void): void {
  const modal = $('prompt-modal');
  const input = $<HTMLInputElement>('prompt-input');
  $('prompt-title').textContent = title;
  input.value = '';
  modal.classList.add('is-open');
  const ok = $('prompt-ok');
  const cancel = $('prompt-cancel');
  const close = () => { modal.classList.remove('is-open'); overlayStack.pop()?.restore?.focus?.(); ok.onclick = null; cancel.onclick = null; input.onkeydown = null; };
  const submit = () => { const v = input.value.trim(); if (v) onOk(v); close(); };
  ok.onclick = submit;
  cancel.onclick = close;
  input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
  overlayStack.push({ node: modal, restore: document.activeElement as HTMLElement, onClose: () => modal.classList.remove('is-open') });
  input.focus();
}

// ---- confirm dialog ---------------------------------------------------

function openConfirm(message: string, onOk: () => void): void {
  const modal = $('confirm-modal');
  $('confirm-msg').textContent = message;
  modal.classList.add('is-open');
  const cancel = $('confirm-cancel');
  const ok = $('confirm-ok');
  const close = () => { modal.classList.remove('is-open'); overlayStack.pop()?.restore?.focus?.(); ok.onclick = null; cancel.onclick = null; };
  ok.onclick = () => { onOk(); close(); };
  cancel.onclick = close;
  overlayStack.push({ node: modal, restore: document.activeElement as HTMLElement, onClose: () => { modal.classList.remove('is-open'); } });
  cancel.focus();
}

// ---- public surface toggles ------------------------------------------

export function openEditor(): void {
  const s = store.getState();
  setEditorTab('blinds');
  rebuildEditor(s);
  rebuildChipsEditor(s);
  structureSig = sig(s);
  chipIdSig = s.chips.map((c) => c.id).join(',');
  const ed = $('editor');
  ed.classList.add('is-open');
  openOverlay(ed, () => ed.classList.remove('is-open'));
  update(s); // mark the current row now that the editor is open
}
export function openSheet(): void {
  const scrim = $('scrim');
  const sheet = $('sheet');
  scrim.hidden = false; sheet.hidden = false;
  requestAnimationFrame(() => { scrim.classList.add('is-open'); sheet.classList.add('is-open'); });
  openOverlay(sheet, () => {
    scrim.classList.remove('is-open'); sheet.classList.remove('is-open');
    window.setTimeout(() => { scrim.hidden = true; sheet.hidden = true; }, 260);
  });
}
export function openHelp(): void {
  const m = $('help-modal');
  m.classList.add('is-open');
  openOverlay(m, () => m.classList.remove('is-open'));
}

// ---- wiring -----------------------------------------------------------

function sig(s: AppState): string {
  return s.entries.map((e) => e.id).join(',');
}

function startPlayGesture(): void {
  const starting = store.getState().timer.status !== 'running';
  if (starting) {
    audio.ensureAudio();
    if (store.getState().settings.autoFullscreen && !fs.isActive()) void fs.enter();
  }
  store.toggle();
}

function bind(): void {
  $('edit-btn').onclick = openEditor;
  $('settings-btn').onclick = openSheet;
  $('fs-btn').onclick = () => fs.toggle();

  $('prev').onclick = () => store.prev();
  $('restart').onclick = () => store.restartLevel();
  $('playpause').onclick = startPlayGesture;
  $('next').onclick = () => store.next();

  $('fs-prev').onclick = () => store.prev();
  $('fs-restart').onclick = () => store.restartLevel();
  $('fs-playpause').onclick = startPlayGesture;
  $('fs-next').onclick = () => store.next();
  $('fs-settings').onclick = openSheet;
  $('fs-exit').onclick = () => fs.exit();

  const seek = $<HTMLInputElement>('seek');
  seek.addEventListener('pointerdown', () => { seekDragging = true; });
  seek.addEventListener('keydown', () => { seekDragging = true; });
  seek.addEventListener('input', () => store.seek(Number(seek.value), false));
  seek.addEventListener('change', () => { seekDragging = false; store.seek(Number(seek.value), true); });
  seek.addEventListener('blur', () => { seekDragging = false; });
  window.addEventListener('pointerup', () => { seekDragging = false; });

  // Sheet
  $('sheet-close').onclick = closeTopmost;
  $('scrim').onclick = closeTopmost;
  $('help-btn').onclick = () => { openHelp(); };
  $('help-close').onclick = closeTopmost;

  bindSwitch('set-soundEnabled', 'soundEnabled');
  bindSwitch('set-warn60', 'warn60');
  bindSwitch('set-flashLast60', 'flashLast60');
  bindSwitch('set-showChips', 'showChips');
  bindSwitch('set-showLogo', 'showLogo');
  bindSwitch('set-logoFullscreen', 'logoFullscreen');
  bindSwitch('set-autoFullscreen', 'autoFullscreen');
  bindSwitch('set-keepAwake', 'keepAwake');
  bindSwitch('set-resumeRunningOnReload', 'resumeRunningOnReload');

  const vol = $<HTMLInputElement>('vol');
  vol.addEventListener('input', () => {
    const v = Number(vol.value) / 100;
    audio.setVolume(v);
    $('vol-val').textContent = `${vol.value}%`;
  });
  vol.addEventListener('change', () => store.setSetting('volume', Number(vol.value) / 100));

  $<HTMLSelectElement>('sound-select').addEventListener('change', (e) => {
    store.setSetting('sound', (e.target as HTMLSelectElement).value);
    audio.warmCustom();
  });
  $('test-btn').onclick = () => audio.preview();
  $('upload-btn').onclick = () => $('sound-file').click();
  $<HTMLInputElement>('sound-file').addEventListener('change', onUpload);

  $('logo-upload-btn').onclick = () => $('logo-file').click();
  $('logo-reset-btn').onclick = onLogoReset;
  $<HTMLInputElement>('logo-file').addEventListener('change', onLogoUpload);

  // Palette colour pickers (live on input, persist on change)
  const palette = $('palette');
  palette.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches('input[data-pal]')) setChannel(t.dataset.pal as keyof Palette, t.value, false);
  });
  palette.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches('input[data-pal]')) setChannel(t.dataset.pal as keyof Palette, t.value, true);
    else if (t.matches('input[data-palhex]') && isHex(t.value)) setChannel(t.dataset.palhex as keyof Palette, t.value, true);
  });

  $('presets').addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const del = t.closest<HTMLElement>('[data-delpreset]');
    if (del) { store.deletePalette(del.dataset.delpreset!); return; }
    const apply = t.closest<HTMLElement>('[data-preset]');
    if (!apply) return;
    const id = apply.dataset.preset!;
    const pal = PRESETS.find((p) => p.id === id)?.palette
      ?? store.getState().settings.savedPalettes.find((p) => p.id === id)?.palette;
    if (pal) { applyPalette(pal, true); store.setPalette({ ...pal }); }
  });
  $('save-palette').onclick = () => openPrompt('Save palette', (name) => store.savePalette(name));

  // Editor
  $('editor-done').onclick = closeTopmost;
  $('tab-blinds').onclick = () => setEditorTab('blinds');
  $('tab-chips').onclick = () => setEditorTab('chips');
  $('add-chip').onclick = () => store.addChip();
  const chipRows = $('chip-rows');
  chipRows.addEventListener('input', onChipInput);
  chipRows.addEventListener('change', onChipInput);
  chipRows.addEventListener('click', onChipClick);
  $('add-level').onclick = () => {
    const s = store.getState();
    const last = [...s.entries].reverse().find((e) => e.kind === 'blind');
    const nb = last && last.kind === 'blind'
      ? newBlind(last.bigBlind, last.bigBlind * 2, last.ante, last.durationSec)
      : newBlind(50, 100, 0);
    store.appendEntry(nb);
  };
  $('add-break').onclick = () => store.appendEntry(newBreak());
  $('editor-reset').onclick = () =>
    openConfirm('Reset the whole structure to the default 26 levels? This can’t be undone.', () => store.resetStructure());

  const rows = $('editor-rows');
  rows.addEventListener('click', onEditorClick);
  rows.addEventListener('input', onEditorInput);
}

function bindSwitch(id: string, key: keyof import('./types').Settings): void {
  $(id).addEventListener('click', () => {
    const cur = store.getState().settings[key] as boolean;
    store.setSetting(key, !cur as never);
  });
}

function onUpload(e: Event): void {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  void audio.uploadFile(file).then((res) => {
    if (res.ok) {
      pendingCustom = { id: res.id, name: res.name };
      store.setSetting('sound', `custom:${res.id}`);
      showToast(`Loaded “${res.name}”`);
    } else {
      showToast(res.error);
    }
  });
}

const LOGO_KEY = 'logo';
const DEFAULT_LOGO = '/poker/oliclub.webp';

export function applyLogo(): void {
  const img = document.getElementById('club-logo') as HTMLImageElement | null;
  if (!img) return;
  if (logoUrl) { URL.revokeObjectURL(logoUrl); logoUrl = null; }
  if (store.getState().settings.customLogo) {
    void storage.getImage(LOGO_KEY).then((blob) => {
      if (blob) { logoUrl = URL.createObjectURL(blob); img.src = logoUrl; }
      else img.src = DEFAULT_LOGO;
    }).catch(() => { img.src = DEFAULT_LOGO; });
  } else {
    img.src = DEFAULT_LOGO;
  }
}

function onLogoUpload(e: Event): void {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('That file is not an image.'); return; }
  if (file.size > 4 * 1024 * 1024) { showToast('Image is too large (max 4 MB).'); return; }
  void storage.putImage(LOGO_KEY, file)
    .then(() => { store.setSetting('customLogo', true); applyLogo(); showToast('Logo updated'); })
    .catch(() => showToast("Couldn't save that image."));
}

function onLogoReset(): void {
  void storage.deleteImage(LOGO_KEY).catch(() => {});
  store.setSetting('customLogo', false);
  applyLogo();
  showToast('Logo reset to default');
}

function onEditorClick(e: Event): void {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!btn) return;
  const id = btn.dataset.id!;
  const act = btn.dataset.act!;
  if (act === 'up') store.moveEntry(id, -1);
  else if (act === 'down') store.moveEntry(id, 1);
  else if (act === 'insert') store.insertAfter(id, newBlind(0, 0, 0));
  else if (act === 'delete') {
    const s = store.getState();
    const index = s.entries.findIndex((x) => x.id === id);
    const entry = s.entries[index];
    if (!entry) return;
    store.deleteEntry(id);
    showToast('Entry removed', 'Undo', () => store.restoreEntryAt(index, entry));
  }
}

function onEditorInput(e: Event): void {
  const input = e.target as HTMLInputElement;
  if (!input.matches('input[data-field]')) return;
  const id = input.dataset.id!;
  const field = input.dataset.field!;
  const raw = parseInt(input.value, 10);
  if (field === 'duration') {
    if (!Number.isFinite(raw) || raw <= 0) { input.setAttribute('aria-invalid', 'true'); return; }
    input.removeAttribute('aria-invalid');
    store.updateEntry(id, { durationSec: raw * 60 });
  } else {
    if (!Number.isFinite(raw) || raw < 0) { input.setAttribute('aria-invalid', 'true'); return; }
    input.removeAttribute('aria-invalid');
    store.updateEntry(id, { [field]: raw } as Partial<LevelEntry>);
    validateBlindRow(input.closest('tr'));
  }
  flashSaved();
}

// ---- palette + chip handlers -----------------------------------------

function setChannel(key: keyof Palette, value: string, commit: boolean): void {
  const hex = normalizeHex(value);
  const p: Palette = { ...store.getState().settings.palette, [key]: hex };
  applyPalette(p, commit);
  if (commit) store.setPalette(p);
  const colorEl = document.getElementById('pal-' + key) as HTMLInputElement | null;
  if (colorEl && colorEl.value.toLowerCase() !== hex) colorEl.value = hex;
  const hexEl = $('palette').querySelector<HTMLInputElement>(`input[data-palhex="${key}"]`);
  if (hexEl && document.activeElement !== hexEl) hexEl.value = hex;
}

function updateChipRowPreview(row: HTMLElement, hex: string): void {
  const prev = row.querySelector<HTMLElement>('[data-chippreview]');
  if (prev) prev.setAttribute('style', chipStyle(hex));
  const hexEl = row.querySelector<HTMLInputElement>('input[data-chiphex]');
  if (hexEl && document.activeElement !== hexEl) hexEl.value = hex;
  const colorEl = row.querySelector<HTMLInputElement>('input[data-chipfield="color"]');
  if (colorEl && colorEl.value.toLowerCase() !== hex) colorEl.value = hex;
}

function onChipInput(e: Event): void {
  const t = e.target as HTMLInputElement;
  const row = t.closest<HTMLElement>('[data-chiprow]');
  if (!row) return;
  const id = row.dataset.chiprow!;
  if (t.matches('input[data-chipfield="color"]')) {
    const hex = normalizeHex(t.value);
    store.updateChip(id, { color: hex });
    updateChipRowPreview(row, hex);
  } else if (t.matches('input[data-chiphex]')) {
    if (!isHex(t.value)) return;
    const hex = normalizeHex(t.value);
    store.updateChip(id, { color: hex });
    updateChipRowPreview(row, hex);
  } else if (t.matches('input[data-chipfield="value"]')) {
    const v = parseInt(t.value, 10);
    if (!Number.isFinite(v) || v < 0) { t.setAttribute('aria-invalid', 'true'); return; }
    t.removeAttribute('aria-invalid');
    store.updateChip(id, { value: v });
  } else return;
  flashSaved();
}

function onChipClick(e: Event): void {
  const del = (e.target as HTMLElement).closest<HTMLElement>('[data-chipdel]');
  if (!del) return;
  const id = del.dataset.chipdel!;
  const s = store.getState();
  const index = s.chips.findIndex((c) => c.id === id);
  const chip = s.chips[index];
  if (!chip) return;
  store.deleteChip(id);
  showToast('Chip removed', 'Undo', () => store.insertChipAt(index, chip));
}

function validateBlindRow(row: HTMLElement | null): void {
  if (!row) return;
  const sbI = row.querySelector<HTMLInputElement>('input[data-field="smallBlind"]');
  const bbI = row.querySelector<HTMLInputElement>('input[data-field="bigBlind"]');
  const warn = row.querySelector<HTMLElement>('.cell-warn');
  if (!sbI || !bbI || !warn) return;
  const bad = Number(bbI.value) < Number(sbI.value);
  bbI.setAttribute('aria-invalid', bad ? 'true' : 'false');
  warn.hidden = !bad;
}

// ---- update -----------------------------------------------------------

let lastSound = '';
let lastPresetSig = ' '; // sentinel so the first update always builds presets

export function update(s: AppState): void {
  const cur = currentEntry(s);
  const status = s.timer.status;
  const remaining = s.timer.remainingSec;

  // status classes
  app.classList.toggle('is-running', status === 'running');
  app.classList.toggle('is-paused', status === 'paused' || status === 'idle');
  app.classList.toggle('is-finished', status === 'finished');
  app.classList.toggle('is-break', isBreak(cur));
  const warn = remaining > 0 && remaining <= 60 && s.settings.flashLast60 && status !== 'finished';
  app.classList.toggle('is-warning', warn);
  app.classList.toggle('is-critical', warn && remaining <= 10);

  // clock
  const txt = formatClock(remaining);
  const ci = txt.lastIndexOf(':');
  $('clk-pre').textContent = txt.slice(0, ci);
  $('clk-post').textContent = txt.slice(ci + 1);

  // notice
  $('notice').hidden = !s.inMemoryOnly;

  // level / blinds
  if (!cur) {
    $('level-text').textContent = 'No levels';
    $('fs-level').textContent = '';
  } else if (isBreak(cur)) {
    $('level-text').textContent = 'Break';
    $('fs-level').textContent = 'Break';
    const rn = resumingBlindNumber(s);
    const nb = nextEntry(s);
    $('break-title').textContent = cur.label || 'Break';
    $('break-sub').textContent = rn && nb && nb.kind === 'blind'
      ? `Then Level ${rn} — ${formatNum(nb.smallBlind)} / ${formatNum(nb.bigBlind)}`
      : '';
  } else {
    const n = blindNumber(s);
    const total = totalBlinds(s);
    $('level-text').textContent = `Level ${n} of ${total}`;
    $('fs-level').textContent = `Level ${n} / ${total}`;
    $('sb').textContent = formatNum(cur.smallBlind);
    $('bb').textContent = formatNum(cur.bigBlind);
    $('ante').textContent = formatNum(cur.ante);
    $('ante-block').hidden = cur.ante <= 0;
  }

  // next up
  const nxt = nextEntry(s);
  if (!nxt) $('next-val').innerHTML = status === 'finished' ? 'Tournament complete' : 'Last level';
  else if (nxt.kind === 'break') $('next-val').innerHTML = `${icon('coffee')} Break · ${Math.round(nxt.durationSec / 60)} min`;
  else $('next-val').textContent = `${formatNum(nxt.smallBlind)} / ${formatNum(nxt.bigBlind)}${nxt.ante > 0 ? ` / ${formatNum(nxt.ante)}` : ''}`;

  // progress
  ($('progress-fill').style.transform = `scaleX(${progressFraction(s)})`);

  // seek
  const dur = cur?.durationSec ?? 0;
  const seek = $<HTMLInputElement>('seek');
  if (!seekDragging) {
    seek.max = String(dur);
    seek.value = String(remaining);
  }
  seek.style.setProperty('--seek-pct', `${dur > 0 ? (remaining / dur) * 100 : 0}%`);
  seek.setAttribute('aria-valuetext', `${formatClock(remaining)} remaining of ${formatClock(dur)}`);
  seek.disabled = status === 'finished' || !cur;
  $('seek-end').textContent = formatClock(dur);

  // transport
  const pp = $('playpause');
  const running = status === 'running';
  const playIcon = running ? icon('pause') : icon('play');
  const playLbl = running ? 'Pause' : status === 'paused' ? 'Resume' : 'Play';
  pp.innerHTML = `${playIcon}<span class="btn__txt">${playLbl}</span>`;
  pp.setAttribute('aria-label', playLbl);
  pp.setAttribute('aria-pressed', running ? 'true' : 'false');
  (pp as HTMLButtonElement).disabled = status === 'finished' || !cur;
  $('fs-playpause').innerHTML = playIcon;
  $('fs-playpause').setAttribute('aria-label', playLbl);

  (($('prev') as HTMLButtonElement).disabled = (s.timer.currentIndex <= 0 && status !== 'finished') || !cur);
  (($('next') as HTMLButtonElement).disabled = status === 'finished' || !cur);
  (($('restart') as HTMLButtonElement).disabled = !cur);

  // fullscreen button label
  $('fs-btn').setAttribute('aria-label', fs.isActive() ? 'Exit fullscreen' : 'Enter fullscreen');
  $('fs-btn').innerHTML = fs.isActive() ? icon('collapse') : icon('expand');

  // legend (windowed) + logo visibility; the fullscreen chip strip is always shown (CSS)
  $('legend').hidden = !s.settings.showChips;
  const clubLogo = document.getElementById('club-logo');
  if (clubLogo) clubLogo.hidden = fs.isActive() ? !s.settings.logoFullscreen : !s.settings.showLogo;

  // settings reflections
  reflectSwitch('set-soundEnabled', s.settings.soundEnabled);
  reflectSwitch('set-warn60', s.settings.warn60);
  reflectSwitch('set-flashLast60', s.settings.flashLast60);
  reflectSwitch('set-showChips', s.settings.showChips);
  reflectSwitch('set-showLogo', s.settings.showLogo);
  reflectSwitch('set-logoFullscreen', s.settings.logoFullscreen);
  reflectSwitch('set-autoFullscreen', s.settings.autoFullscreen);
  reflectSwitch('set-keepAwake', s.settings.keepAwake);
  reflectSwitch('set-resumeRunningOnReload', s.settings.resumeRunningOnReload);
  const keepAwakeBtn = $('set-keepAwake') as HTMLButtonElement;
  if (!fs.wakeLockSupported()) { keepAwakeBtn.setAttribute('aria-disabled', 'true'); keepAwakeBtn.title = 'Not supported in this browser'; }

  const volEl = $<HTMLInputElement>('vol');
  if (document.activeElement !== volEl) { volEl.value = String(Math.round(s.settings.volume * 100)); $('vol-val').textContent = `${Math.round(s.settings.volume * 100)}%`; }

  if (lastSound !== s.settings.sound) { lastSound = s.settings.sound; rebuildSoundSelect(s); }

  // palette pickers reflect current values
  for (const [key] of PAL_ROLES) {
    const hex = normalizeHex(s.settings.palette[key]);
    const colorEl = document.getElementById('pal-' + key) as HTMLInputElement | null;
    if (colorEl && document.activeElement !== colorEl && colorEl.value.toLowerCase() !== hex) colorEl.value = hex;
    const hexEl = $('palette').querySelector<HTMLInputElement>(`input[data-palhex="${key}"]`);
    if (hexEl && document.activeElement !== hexEl) hexEl.value = hex;
  }
  const presetSig = s.settings.savedPalettes.map((p) => p.id + p.name).join('|');
  if (presetSig !== lastPresetSig) { lastPresetSig = presetSig; rebuildPresets(s); }
  reflectActivePreset(s);

  // chips: rebuild legend + fullscreen strip on any chip change;
  // rebuild the editor panel only when chips are added/removed (keeps focus while typing).
  const dispSig = s.chips.map((c) => `${c.id}:${c.color}:${c.value}`).join('|');
  if (dispSig !== chipDisplaySig) { chipDisplaySig = dispSig; rebuildLegend(s); }
  if ($('editor').classList.contains('is-open')) {
    const idSig = s.chips.map((c) => c.id).join(',');
    if (idSig !== chipIdSig) { chipIdSig = idSig; rebuildChipsEditor(s); }
  }

  // editor live bits (no rebuild unless shape changed)
  const newSig = sig(s);
  const editorOpen = $('editor').classList.contains('is-open');
  if (editorOpen && newSig !== structureSig) { rebuildEditor(s); }
  structureSig = newSig;
  if (editorOpen) {
    $('editor-rows').querySelectorAll<HTMLElement>('tr.row').forEach((tr, i) => {
      tr.classList.toggle('is-current', i === s.timer.currentIndex);
      const now = tr.querySelector<HTMLElement>('[data-now]');
      if (now) now.hidden = i !== s.timer.currentIndex;
    });
  }

  // live region (announce level changes only)
  const key = `${s.timer.currentIndex}:${isBreak(cur) ? 'b' : 'l'}`;
  if (key !== lastAnnouncedKey) {
    lastAnnouncedKey = key;
    if (cur) {
      $('live').textContent = isBreak(cur)
        ? `Break. ${Math.round(cur.durationSec / 60)} minutes.`
        : `Level ${blindNumber(s)}. Small blind ${formatNum(cur.smallBlind)}, big blind ${formatNum(cur.bigBlind)}${cur.ante > 0 ? `, ante ${formatNum(cur.ante)}` : ''}.`;
    }
  }
}

function reflectSwitch(id: string, on: boolean): void {
  $(id).setAttribute('aria-checked', on ? 'true' : 'false');
}

function rebuildPresets(s: AppState): void {
  const built = PRESETS.map((p) => presetHTML(p.id, p.name, p.palette, false));
  const saved = s.settings.savedPalettes.map((p) => presetHTML(p.id, p.name, p.palette, true));
  $('presets').innerHTML = built.concat(saved).join('');
}

function reflectActivePreset(s: AppState): void {
  const cur = s.settings.palette;
  $('presets').querySelectorAll<HTMLElement>('.preset__apply').forEach((b) => {
    const id = b.dataset.preset!;
    const pal = PRESETS.find((p) => p.id === id)?.palette
      ?? s.settings.savedPalettes.find((p) => p.id === id)?.palette;
    b.setAttribute('aria-pressed', pal && palettesEqual(pal, cur) ? 'true' : 'false');
  });
}

function rebuildSoundSelect(s: AppState): void {
  const sel = $<HTMLSelectElement>('sound-select');
  const opts = SOUND_PRESETS.map((p) => `<option value="${p.id}">${p.name}</option>`);
  if (s.settings.sound.startsWith('custom:')) {
    const name = pendingCustom?.name ?? 'Custom sound';
    opts.push(`<option value="${s.settings.sound}">${name}</option>`);
  }
  sel.innerHTML = opts.join('');
  sel.value = s.settings.sound;
}

// ---- mount ------------------------------------------------------------

export function mount(): void {
  app = $('app');
  app.className = 'app';
  app.removeAttribute('aria-busy');
  app.innerHTML = appHTML();
  bind();
  applyLogo();
  document.addEventListener('keydown', trapTab, true);
  fs.init(app);
}

export { closeTopmost, anyOverlayOpen, startPlayGesture as playPause };
