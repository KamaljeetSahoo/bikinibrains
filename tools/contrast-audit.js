'use strict';
// Reads the theme tokens straight out of app.css and reports real contrast
// ratios. Cells are painted at full opacity once they have faded in, so the
// token value is the rendered value and no compositing is needed.
const fs = require('fs');

const css = fs.readFileSync(require('node:path').join(__dirname, '..', 'assets', 'css', 'app.css'), 'utf8');

function block(selector) {
  const start = css.indexOf(selector);
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  const tokens = {};
  for (const line of css.slice(open + 1, close).split('\n')) {
    const m = line.match(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/);
    if (m) tokens[m[1]] = m[2];
  }
  return tokens;
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (hex) => { const [r, g, b] = rgb(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

function report(name, t) {
  console.log(`\n================ ${name} ================`);
  const board = t['--canvas-board'];

  const checks = [
    // WCAG 1.4.3 — all of these carry real words at normal size.
    ['TEXT (need 4.5)', 4.5, 'max', [
      ['text / surface', t['--text'], t['--surface']],
      ['text / void', t['--text'], t['--void']],
      ['text / surface-2  (buttons)', t['--text'], t['--surface-2']],
      ['text-2 / surface', t['--text-2'], t['--surface']],
      ['text-2 / void', t['--text-2'], t['--void']],
      ['text-2 / surface-2', t['--text-2'], t['--surface-2']],
      ['text-3 / surface  (group titles, 11px = normal text)', t['--text-3'], t['--surface']],
      ['text-3 / surface-2', t['--text-3'], t['--surface-2']],
      ['accent-ink on accent  (primary button)', t['--accent-ink'], t['--accent']],
      ['accent / surface  (f value, glyph)', t['--accent'], t['--surface']],
    ]],
    // WCAG 1.4.11 — the boundary that identifies a control.
    ['UI GRAPHICS (need 3.0)', 3.0, 'max', [
      ['line-strong / surface  (control borders)', t['--line-strong'], t['--surface']],
      ['line-strong / surface-2', t['--line-strong'], t['--surface-2']],
      ['status dot good / surface', t['--good'], t['--surface']],
      ['status dot bad / surface', t['--bad'], t['--surface']],
      ['slider thumb / surface-3', t['--accent'], t['--surface-3']],
    ]],
    // Things whose meaning rides on colour alone, against empty board.
    ['CANVAS vs BOARD (need 3.0)', 3.0, 'max', [
      ['wall', t['--canvas-wall'], board],
      ['path', t['--canvas-path'], board],
      ['start marker', t['--canvas-start'], board],
      ['goal marker', t['--canvas-goal'], board],
    ]],
    // Regions that share a border on the board must not share a brightness.
    // The wake runs from `visited-near` at the start to `visited-far` at its
    // outer edge, so it is `far` that has to hold its own against the board.
    // Walls are scattered through the whole wake, so they must clear BOTH ends
    // of the ramp — which is what forces them outside it rather than into the
    // comfortable middle.
    ['REGION SEPARATION (need 1.7)', 1.7, 'max', [
      ['cost ramp spread: near -> far', t['--canvas-visited-near'], t['--canvas-visited-far']],
      ['visited-far vs board  (the wake\'s outer edge)', t['--canvas-visited-far'], board],
      ['wall vs the near end of the ramp', t['--canvas-wall'], t['--canvas-visited-near']],
      ['wall vs the far end of the ramp', t['--canvas-wall'], t['--canvas-visited-far']],
      ['frontier vs visited-far  (they always touch)', t['--canvas-frontier'], t['--canvas-visited-far']],
      // The frontier is drawn as an inset, rounded pip rather than a filled
      // cell, and the near end of the ramp is the wake's interior rather than
      // an edge against open board. Neither carries its meaning by colour
      // alone, so both are held to the separation bar and not to the stricter
      // 3:1 that the wall, path and markers have to clear.
      ['frontier pip vs board', t['--canvas-frontier'], board],
      ['frontier pip vs wall', t['--canvas-frontier'], t['--canvas-wall']],
      ['ramp near end vs board  (wake interior)', t['--canvas-visited-near'], board],
    ]],
    // The path is stroked over a casing in the board colour, so it is
    // separated from whatever it crosses by construction; only the casing
    // itself has to read against the board.
    ['PATH CASING (need 3.0)', 3.0, 'max', [
      ['path core vs casing', t['--canvas-path'], t['--canvas-path-casing']],
    ]],
    ['SUBTLE — grid lines should whisper (1.1 to 1.9)', 1.9, 'range', [
      ['grid line vs board', t['--canvas-grid-line'], board],
    ]],
  ];

  let failures = 0;
  for (const [group, threshold, mode, rows] of checks) {
    console.log(`\n  ${group}`);
    for (const [label, a, b] of rows) {
      const r = ratio(a, b);
      const ok = mode === 'range' ? r >= 1.1 && r <= threshold : r >= threshold;
      if (!ok) failures++;
      console.log(`   ${ok ? 'ok  ' : 'FAIL'} ${r.toFixed(2).padStart(6)}  ${label}`);
    }
  }
  return failures;
}

const total =
  report('DARK', block(':root,\n:root[data-theme="dark"]')) +
  report('LIGHT', block(':root[data-theme="light"]'));

console.log(`\n${total === 0 ? 'All contrast checks pass.' : total + ' FAILURES'}`);
process.exit(total === 0 ? 0 : 1);
