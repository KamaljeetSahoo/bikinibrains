/**
 * Wiring: the grid, the search and the renderer are all independent of each
 * other and of the page. This file is the only one that knows the DOM exists.
 */

const ui = {};
for (const element of document.querySelectorAll('[id]')) ui[element.id] = element;

const state = {
  grid: null,
  search: null,
  renderer: null,
  start: 0,
  goal: 0,
  playing: false,
  stepCredit: 0,
  finishedAt: 0,
  hoverIndex: -1,
  /** Separate from the pointer: the cell the keyboard is pointing at. */
  cursorIndex: -1,
  pointer: null,
  /** How the board was last filled, so resizing keeps its character. */
  terrain: 'scatter',
  announced: '',
  shownStatus: null,
};

const MIN_SIZE = 10;

/* ------------------------------------------------------------------ options */

function readOptions() {
  return {
    algorithm: ui.algorithm.value,
    heuristic: ui.heuristic.value,
    weight: Number(ui.weight.value),
    diagonal: ui.diagonal.checked,
    cutCorners: ui.diagonal.checked && ui.cutCorners.checked,
  };
}

/** Cells expanded per frame, on an exponential curve so the slow end is usable. */
function stepsPerFrame() {
  const value = Number(ui.speed.value);
  return 0.1 * Math.pow(6000, (value - 1) / 99);
}

/* -------------------------------------------------------------------- board */

function defaultEndpoints(grid) {
  const inset = grid.cols >= 16 ? 2 : 1;
  return {
    start: grid.index(inset, inset),
    goal: grid.index(grid.cols - 1 - inset, grid.rows - 1 - inset),
  };
}

function buildGrid(size) {
  const grid = new Grid(size, size);
  state.grid = grid;

  const { start, goal } = defaultEndpoints(grid);
  state.start = start;
  state.goal = goal;
  state.cursorIndex = -1;
  state.hoverIndex = -1;

  fillTerrain(state.terrain);
}

function fillTerrain(kind) {
  const { grid } = state;
  state.terrain = kind;

  if (kind === 'maze') {
    generateMaze(grid);
    carveAccess(grid, state.start);
    carveAccess(grid, state.goal);
  } else if (kind === 'scatter') {
    scatterWalls();
  } else {
    grid.clearWalls();
  }

  clearAround(state.start);
  clearAround(state.goal);
  resetSearch();
}

/**
 * Scatters walls, but keeps rolling until the goal is actually reachable.
 *
 * Uniform random walls seal the board off surprisingly often — near the
 * percolation threshold it is close to a coin flip — and "no path exists" is a
 * poor first thing to show someone. It stays reachable as a state you can
 * create deliberately by drawing, just not one the page opens on.
 */
function scatterWalls() {
  const { grid } = state;
  const density = Number(ui.density.value) / 100;

  for (let attempt = 0; attempt < 8; attempt++) {
    grid.randomize(density, [state.start, state.goal]);
    clearAround(state.start);
    clearAround(state.goal);
    if (isReachable()) return;
  }

  // Very high densities may never come up solvable. Rather than hand back a
  // dead board, open a single corridor between the two markers.
  carveCorridor();
}

/**
 * Opens an L-shaped corridor from the start to the goal: along the row first,
 * then down the column. It has to turn square corners rather than cut across
 * diagonally — a one-cell-wide diagonal corridor is impassable whenever corner
 * cutting is off, and impassable to four-way movement in any case.
 */
function carveCorridor() {
  const { grid } = state;
  const row = grid.row(state.start);
  const targetCol = grid.col(state.goal);
  const targetRow = grid.row(state.goal);

  for (let col = Math.min(grid.col(state.start), targetCol); col <= Math.max(grid.col(state.start), targetCol); col++) {
    grid.setWall(grid.index(col, row), false);
  }
  for (let r = Math.min(row, targetRow); r <= Math.max(row, targetRow); r++) {
    grid.setWall(grid.index(targetCol, r), false);
  }
}

/** Would any route get from the start to the goal at all? */
function isReachable() {
  const probe = new Search(state.grid, state.start, state.goal, {
    ...readOptions(),
    algorithm: 'dijkstra',
  });
  probe.solve();
  return probe.status === SearchStatus.FOUND;
}

/** Keeps a marker's immediate surroundings walkable so it is never sealed in. */
function clearAround(index) {
  const { grid } = state;
  const col = grid.col(index);
  const row = grid.row(index);
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (grid.contains(col + dc, row + dr)) grid.setWall(grid.index(col + dc, row + dr), false);
    }
  }
}

/* ------------------------------------------------------------------- search */

function resetSearch({ instant = false } = {}) {
  state.search = new Search(state.grid, state.start, state.goal, readOptions());
  state.stepCredit = 0;
  state.finishedAt = 0;

  if (instant) {
    state.search.solve();
    state.finishedAt = performance.now() - PATH_DRAW_MS; // Skip the draw-on animation.
  }

  syncStats();
  syncStatus();
  syncProbe();
}

/**
 * Called after the board is edited. If the search had already settled we solve
 * again immediately, so dragging a wall around shows the route re-forming in
 * real time instead of leaving a stale answer on screen.
 */
function boardEdited() {
  const wasFinished = state.search && state.search.isFinished;
  const wasRunning = state.playing;
  resetSearch({ instant: wasFinished && !wasRunning });
  state.playing = wasRunning;
  syncControls();
}

/* --------------------------------------------------------------- animation */

function frame(now) {
  const { search } = state;

  if (state.playing && search && !search.isFinished) {
    state.stepCredit += stepsPerFrame();
    const budget = Math.floor(state.stepCredit);
    if (budget >= 1) {
      state.stepCredit -= budget;
      search.run(budget);
    }
    if (search.isFinished) {
      state.playing = false;
      state.finishedAt = now;
      syncControls();
    }
    syncStats();
  }

  // The status line has to follow the search's own transitions, not just the
  // button presses — otherwise it still reads "Ready" while cells are being
  // expanded in front of you.
  if (search && search.status !== state.shownStatus) syncStatus();

  state.renderer.draw(state.grid, search, {
    now,
    hoverIndex: state.hoverIndex,
    cursorIndex: state.cursorIndex,
    finishedAt: state.finishedAt,
  });

  requestAnimationFrame(frame);
}

/* ----------------------------------------------------------------- read-out */

function syncStats() {
  const { search } = state;
  if (!search) return;

  const found = search.status === SearchStatus.FOUND;
  ui.statExpanded.textContent = search.expansions.toLocaleString();
  ui.statFrontier.textContent = search.frontierSize.toLocaleString();
  ui.statLength.textContent = found ? search.path.length.toLocaleString() : '—';
  ui.statCost.textContent = found ? search.pathCost.toFixed(1) : '—';
  ui.statTime.textContent = `${search.elapsed.toFixed(1)} ms`;
}

function syncStatus() {
  const { search } = state;
  if (!search) return;

  const messages = {
    [SearchStatus.READY]: 'Ready — press Play, or draw walls on the board.',
    [SearchStatus.RUNNING]: 'Searching…',
    [SearchStatus.FOUND]: 'Path found.',
    [SearchStatus.UNREACHABLE]: 'No path exists. Every reachable cell was examined.',
  };

  state.shownStatus = search.status;
  ui.statusText.textContent = messages[search.status];
  ui.statusDot.dataset.status = search.status;

  const guarantee = search.describeGuarantee();
  ui.guaranteeText.textContent = guarantee.text;
  ui.guarantee.dataset.optimal = String(guarantee.optimal);

  const { algorithm, heuristic, weight, diagonal } = search.options;
  const parts = [ALGORITHMS[algorithm].label];
  if (ALGORITHMS[algorithm].usesHeuristic) parts.push(HEURISTICS[heuristic].label.toLowerCase());
  if (algorithm === 'astar' && weight !== 1) parts.push(`w ${weight.toFixed(1)}`);
  parts.push(diagonal ? '8-way' : '4-way');
  ui.configEcho.textContent = parts.join(' · ');

  if (search.status === SearchStatus.FOUND) {
    announce(`Path found. ${search.path.length} cells, cost ${search.pathCost.toFixed(1)}, after ${search.expansions} expansions.`);
  } else if (search.status === SearchStatus.UNREACHABLE) {
    announce('No path exists between the start and the goal.');
  }
}

/** The live f = g + h readout for whichever cell is being pointed at. */
function syncProbe(index = state.hoverIndex !== -1 ? state.hoverIndex : state.cursorIndex) {
  const { grid, search } = state;

  if (index === -1 || !search) {
    ui.probe.dataset.active = 'false';
    ui.probeCell.textContent = 'Hover the board';
    ui.probeG.textContent = ui.probeH.textContent = ui.probeF.textContent = '—';
    return;
  }

  const label = `(${grid.col(index)}, ${grid.row(index)})`;
  ui.probe.dataset.active = 'true';

  if (grid.isWall(index)) {
    ui.probeCell.textContent = `${label} wall`;
    ui.probeG.textContent = ui.probeH.textContent = ui.probeF.textContent = '—';
    return;
  }
  if (search.state[index] === CellState.UNVISITED) {
    ui.probeCell.textContent = `${label} not reached`;
    ui.probeG.textContent = ui.probeH.textContent = ui.probeF.textContent = '—';
    return;
  }

  ui.probeCell.textContent = `${label} ${search.state[index] === CellState.OPEN ? 'frontier' : 'settled'}`;
  ui.probeG.textContent = search.g[index].toFixed(1);
  ui.probeH.textContent = search.h[index].toFixed(1);
  ui.probeF.textContent = search.f[index].toFixed(1);
}

function syncControls() {
  const algorithm = ui.algorithm.value;
  const usesHeuristic = ALGORITHMS[algorithm].usesHeuristic;

  ui.heuristic.disabled = !usesHeuristic;
  ui.heuristic.closest('.field').classList.toggle('field--muted', !usesHeuristic);
  ui.weight.disabled = algorithm !== 'astar';
  ui.weight.closest('.field').classList.toggle('field--muted', algorithm !== 'astar');
  ui.cutCorners.disabled = !ui.diagonal.checked;

  ui.heuristicHint.textContent = usesHeuristic
    ? HEURISTICS[ui.heuristic.value].hint
    : 'Unused — Dijkstra never guesses at the distance remaining.';

  ui.weightValue.textContent = `${Number(ui.weight.value).toFixed(1)}×`;
  ui.sizeValue.textContent = `${ui.size.value} × ${ui.size.value}`;
  ui.densityValue.textContent = `${ui.density.value}%`;

  const rate = stepsPerFrame();
  ui.speedValue.textContent = rate >= 1 ? `${Math.round(rate)} cells/frame` : `1 cell / ${Math.round(1 / rate)} frames`;

  const finished = state.search && state.search.isFinished;
  ui.play.setAttribute('aria-pressed', String(state.playing));
  ui.play.querySelector('.button__label').textContent = state.playing ? 'Pause' : finished ? 'Replay' : 'Play';
  ui.step.disabled = state.playing || Boolean(finished);
}

function announce(message) {
  if (message === state.announced) return;
  state.announced = message;
  ui.live.textContent = message;
}

/* -------------------------------------------------------------- interaction */

function pointerCell(event) {
  return state.renderer.cellAt(event.clientX, event.clientY, state.grid);
}

/** Walks a straight line between two cells so a fast drag paints no gaps. */
function forEachCellBetween(from, to, visit) {
  const { grid } = state;
  let x0 = grid.col(from);
  let y0 = grid.row(from);
  const x1 = grid.col(to);
  const y1 = grid.row(to);

  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;

  for (;;) {
    visit(grid.index(x0, y0));
    if (x0 === x1 && y0 === y1) break;
    const doubled = error * 2;
    if (doubled >= dy) {
      error += dy;
      x0 += sx;
    }
    if (doubled <= dx) {
      error += dx;
      y0 += sy;
    }
  }
}

function onPointerDown(event) {
  const index = pointerCell(event);
  if (index === -1) return;

  ui.board.setPointerCapture(event.pointerId);

  if (index === state.start) {
    state.pointer = { kind: 'move-start' };
  } else if (index === state.goal) {
    state.pointer = { kind: 'move-goal' };
  } else {
    // Starting on open ground draws; starting on a wall erases. One gesture,
    // both tools, no mode switch to hunt for.
    state.pointer = { kind: 'paint', value: !state.grid.isWall(index), last: index };
    state.grid.setWall(index, state.pointer.value);
    boardEdited();
  }
  event.preventDefault();
}

function onPointerMove(event) {
  const index = pointerCell(event);
  if (index !== state.hoverIndex) {
    state.hoverIndex = index;
    syncProbe();
  }

  if (!state.pointer || index === -1) return;

  if (state.pointer.kind === 'paint') {
    forEachCellBetween(state.pointer.last, index, (cell) => {
      if (cell === state.start || cell === state.goal) return;
      state.grid.setWall(cell, state.pointer.value);
    });
    state.pointer.last = index;
    boardEdited();
    return;
  }

  moveEndpoint(state.pointer.kind === 'move-start', index);
}

function moveEndpoint(isStart, index) {
  const other = isStart ? state.goal : state.start;
  if (index === other || state.grid.isWall(index)) return false;

  if (isStart) state.start = index;
  else state.goal = index;
  boardEdited();
  return true;
}

function onPointerUp(event) {
  if (state.pointer && ui.board.hasPointerCapture(event.pointerId)) {
    ui.board.releasePointerCapture(event.pointerId);
  }
  state.pointer = null;
}

/**
 * Keyboard access to the board itself. Without this the whole interactive half
 * of the page — drawing walls, moving the endpoints — is reachable by mouse
 * only.
 */
function onBoardKeyDown(event) {
  const { grid } = state;
  const moves = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  };

  if (moves[event.key]) {
    event.preventDefault();
    if (state.cursorIndex === -1) {
      state.cursorIndex = state.start;
    } else {
      const [dc, dr] = moves[event.key];
      const stride = event.shiftKey ? 5 : 1;
      const col = Math.min(grid.cols - 1, Math.max(0, grid.col(state.cursorIndex) + dc * stride));
      const row = Math.min(grid.rows - 1, Math.max(0, grid.row(state.cursorIndex) + dr * stride));
      state.cursorIndex = grid.index(col, row);
    }
    syncProbe();
    describeCursor();
    return;
  }

  if (state.cursorIndex === -1) return;
  const index = state.cursorIndex;

  if (event.key === 'Enter') {
    event.preventDefault();
    if (index === state.start || index === state.goal) {
      announce('That cell holds the start or the goal.');
      return;
    }
    grid.setWall(index, !grid.isWall(index));
    boardEdited();
    announce(grid.isWall(index) ? 'Wall added.' : 'Wall removed.');
  } else if (event.key === '1' || event.key === '2') {
    event.preventDefault();
    const isStart = event.key === '1';
    if (moveEndpoint(isStart, index)) {
      announce(`${isStart ? 'Start' : 'Goal'} moved to column ${grid.col(index)}, row ${grid.row(index)}.`);
    } else {
      announce('Cannot place there.');
    }
  }
}

function describeCursor() {
  const { grid, search } = state;
  const index = state.cursorIndex;
  const where = `Column ${grid.col(index)}, row ${grid.row(index)}`;

  if (index === state.start) return announce(`${where}. Start.`);
  if (index === state.goal) return announce(`${where}. Goal.`);
  if (grid.isWall(index)) return announce(`${where}. Wall.`);

  const cellState = search ? search.state[index] : CellState.UNVISITED;
  if (cellState === CellState.UNVISITED) return announce(`${where}. Open, not reached.`);
  announce(
    `${where}. ${cellState === CellState.OPEN ? 'On the frontier' : 'Settled'}, ` +
    `g ${search.g[index].toFixed(1)}, h ${search.h[index].toFixed(1)}, f ${search.f[index].toFixed(1)}.`
  );
}

/* ------------------------------------------------------------------- theme */

const THEME_KEY = 'astar-theme';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  ui.theme.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Private browsing: the theme simply will not persist. */
  }
  if (state.renderer) state.renderer.refreshPalette();
}

function initialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/* -------------------------------------------------------------------- boot */

function populateSelects() {
  ui.algorithm.innerHTML = Object.entries(ALGORITHMS)
    .map(([value, { label }]) => `<option value="${value}">${label}</option>`)
    .join('');
  ui.heuristic.innerHTML = Object.entries(HEURISTICS)
    .map(([value, { label }]) => `<option value="${value}">${label}</option>`)
    .join('');
  ui.algorithm.value = 'astar';
  ui.heuristic.value = 'octile';
}

function bindControls() {
  ui.play.addEventListener('click', () => {
    if (state.search.isFinished) resetSearch();
    state.playing = !state.playing;
    syncControls();
  });

  ui.step.addEventListener('click', () => {
    state.playing = false;
    state.search.run(1);
    if (state.search.isFinished) state.finishedAt = performance.now();
    syncStats();
    syncStatus();
    syncProbe();
    syncControls();
  });

  ui.reset.addEventListener('click', () => {
    state.playing = false;
    resetSearch();
    syncControls();
  });

  for (const [button, terrain] of [[ui.maze, 'maze'], [ui.scatter, 'scatter'], [ui.clear, 'empty']]) {
    button.addEventListener('click', () => {
      state.playing = false;
      fillTerrain(terrain);
      syncControls();
    });
  }

  for (const control of [ui.algorithm, ui.heuristic, ui.weight, ui.diagonal, ui.cutCorners]) {
    control.addEventListener('input', () => {
      state.playing = false;
      resetSearch();
      syncControls();
    });
  }

  ui.size.addEventListener('input', () => {
    state.playing = false;
    buildGrid(Math.max(MIN_SIZE, Number(ui.size.value)));
    state.renderer.resize(state.grid);
    syncControls();
  });

  ui.density.addEventListener('input', () => {
    syncControls();
    if (state.terrain !== 'scatter') return;
    state.playing = false;
    fillTerrain('scatter');
    syncControls();
  });

  ui.speed.addEventListener('input', syncControls);

  ui.theme.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  ui.board.addEventListener('pointerdown', onPointerDown);
  ui.board.addEventListener('pointermove', onPointerMove);
  ui.board.addEventListener('pointerup', onPointerUp);
  ui.board.addEventListener('pointercancel', onPointerUp);
  ui.board.addEventListener('pointerleave', () => {
    state.hoverIndex = -1;
    syncProbe();
  });
  ui.board.addEventListener('keydown', onBoardKeyDown);
  ui.board.addEventListener('focus', () => {
    if (state.cursorIndex === -1) state.cursorIndex = state.start;
    syncProbe();
  });
  ui.board.addEventListener('blur', () => {
    state.cursorIndex = -1;
    syncProbe();
  });

  // Pointing at a legend row dims every other layer on the board, which is the
  // quickest way to answer "which of these colours is which?".
  for (const button of ui.legend.querySelectorAll('button')) {
    const layer = button.dataset.layer;
    const show = () => state.renderer.setIsolation(layer);
    const hide = () => state.renderer.setIsolation(null);
    button.addEventListener('pointerenter', show);
    button.addEventListener('pointerleave', hide);
    button.addEventListener('focus', show);
    button.addEventListener('blur', hide);
  }

  const shortcuts = {
    ' ': () => ui.play.click(),
    s: () => !ui.step.disabled && ui.step.click(),
    r: () => ui.reset.click(),
    m: () => ui.maze.click(),
    n: () => ui.scatter.click(),
    c: () => ui.clear.click(),
    t: () => ui.theme.click(),
    d: () => {
      ui.diagonal.checked = !ui.diagonal.checked;
      ui.diagonal.dispatchEvent(new Event('input'));
    },
  };

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // Let the browser's own keyboard handling win inside form controls.
    if (event.target.closest('input, select, textarea')) return;

    const action = shortcuts[event.key.toLowerCase()];
    if (!action) return;
    event.preventDefault();
    action();
  });
}

function start() {
  applyTheme(initialTheme());
  populateSelects();

  state.renderer = new Renderer(ui.board);
  state.renderer.refreshPalette();

  buildGrid(Number(ui.size.value));
  state.renderer.resize(state.grid);

  bindControls();
  syncControls();

  new ResizeObserver(() => {
    state.renderer.resize(state.grid);
  }).observe(ui.board.parentElement);

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    try {
      if (localStorage.getItem(THEME_KEY)) return; // Respect an explicit choice.
    } catch {
      /* ignore */
    }
    applyTheme(event.matches ? 'light' : 'dark');
  });

  requestAnimationFrame(frame);

  // Start with the search already running, so the page is alive on arrival.
  state.playing = true;
  syncControls();
}

start();
