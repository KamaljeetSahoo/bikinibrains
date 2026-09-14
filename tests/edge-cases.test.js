'use strict';

/**
 * Degenerate boards and awkward sizes.
 *
 * The happy path is covered in engine.test.js. These are the cases that only
 * show up at the edges of the sliders, or when someone drags a marker somewhere
 * unhelpful.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = path.join(__dirname, '..', 'src');
const FILES = ['heap.js', 'grid.js', 'search.js', 'maze.js'];
const EXPORTS = '({ MinHeap, Grid, Search, CellState, SearchStatus, HEURISTICS, ALGORITHMS, generateMaze, carveAccess })';

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function loadEngine() {
  const context = vm.createContext({ performance, console });
  for (const file of FILES) {
    vm.runInContext(fs.readFileSync(path.join(SRC, file), 'utf8'), context, { filename: file });
  }
  const engine = vm.runInContext(EXPORTS, context);
  engine.seed = (value) => {
    context.__random = mulberry32(value);
    vm.runInContext('Math.random = __random;', context);
  };
  return engine;
}

const engine = loadEngine();
const { MinHeap, Grid, Search, SearchStatus, generateMaze, carveAccess } = engine;

const EIGHT_WAY = { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false };
const FOUR_WAY = { ...EIGHT_WAY, heuristic: 'manhattan', diagonal: false };

/** Flood fill orthogonally; returns how many open cells are reachable. */
function reachableCount(grid, from) {
  const seen = new Uint8Array(grid.size);
  const stack = [from];
  seen[from] = 1;
  let count = 1;
  while (stack.length > 0) {
    const cell = stack.pop();
    const col = grid.col(cell);
    const row = grid.row(cell);
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      if (!grid.contains(col + dc, row + dr)) continue;
      const next = grid.index(col + dc, row + dr);
      if (seen[next] || grid.isWall(next)) continue;
      seen[next] = 1;
      count++;
      stack.push(next);
    }
  }
  return count;
}

function openCount(grid) {
  let open = 0;
  for (let i = 0; i < grid.size; i++) if (grid.isOpen(i)) open++;
  return open;
}

test('the start already being the goal is answered immediately', () => {
  const grid = new Grid(12, 12);
  const cell = grid.index(5, 5);
  const search = new Search(grid, cell, cell, EIGHT_WAY);
  search.solve();

  assert.equal(search.status, SearchStatus.FOUND);
  assert.deepEqual(Array.from(search.path), [cell]);
  assert.equal(search.pathCost, 0);
  assert.equal(search.expansions, 1);
});

test('a goal that is itself a wall is unreachable, not a crash', () => {
  const grid = new Grid(12, 12);
  const goal = grid.index(9, 9);
  grid.setWall(goal, true);

  const search = new Search(grid, grid.index(1, 1), goal, EIGHT_WAY);
  search.solve();

  assert.equal(search.status, SearchStatus.UNREACHABLE);
  assert.equal(search.path.length, 0);
});

test('a start sealed in by walls terminates at once', () => {
  const grid = new Grid(12, 12);
  const start = grid.index(5, 5);
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dc || dr) grid.setWall(grid.index(5 + dc, 5 + dr), true);
    }
  }

  const search = new Search(grid, start, grid.index(11, 11), EIGHT_WAY);
  search.solve();

  assert.equal(search.status, SearchStatus.UNREACHABLE);
  assert.equal(search.expansions, 1, 'only the start itself should ever be expanded');
});

test('degenerate grid shapes still search correctly', () => {
  // A single column: the only route is straight down.
  const column = new Grid(1, 14);
  const down = new Search(column, column.index(0, 0), column.index(0, 13), EIGHT_WAY);
  down.solve();
  assert.equal(down.status, SearchStatus.FOUND);
  assert.equal(down.path.length, 14);
  assert.ok(Math.abs(down.pathCost - 13) < 1e-9);

  // A single row.
  const row = new Grid(14, 1);
  const across = new Search(row, row.index(0, 0), row.index(13, 0), EIGHT_WAY);
  across.solve();
  assert.equal(across.status, SearchStatus.FOUND);
  assert.equal(across.path.length, 14);

  // The smallest board the UI can produce, and smaller still.
  for (const size of [1, 2, 3, 10]) {
    const grid = new Grid(size, size);
    const search = new Search(grid, 0, grid.size - 1, EIGHT_WAY);
    search.solve();
    assert.equal(search.status, SearchStatus.FOUND, `${size}x${size} should be solvable when empty`);
  }
});

test('non-square boards are searched over their real extent', () => {
  const grid = new Grid(30, 9);
  const search = new Search(grid, grid.index(0, 0), grid.index(29, 8), FOUR_WAY);
  search.solve();

  assert.equal(search.status, SearchStatus.FOUND);
  assert.ok(Math.abs(search.pathCost - (29 + 8)) < 1e-9, 'four-way cost is the Manhattan distance');
  for (const cell of search.path) {
    assert.ok(grid.col(cell) < 30 && grid.row(cell) < 9, 'path left the board');
  }
});

test('mazes are connected at even sizes too, not just odd ones', () => {
  // Corridors sit on odd coordinates, so an even-sized board leaves a spare
  // row and column at the far edge. That is exactly where an off-by-one in the
  // carving bounds would hide.
  for (const size of [10, 16, 30, 40, 46, 64, 100]) {
    engine.seed(size * 131 + 7);
    const grid = new Grid(size, size);
    generateMaze(grid);

    const start = grid.index(1, 1);
    assert.ok(grid.isOpen(start), `${size}: corridor origin should be open`);
    assert.equal(
      reachableCount(grid, start),
      openCount(grid),
      `${size}x${size} maze has open cells cut off from the rest`
    );
  }
});

test('mazes are connected on non-square boards', () => {
  for (const [cols, rows] of [[21, 41], [40, 20], [11, 60]]) {
    engine.seed(cols * 977 + rows);
    const grid = new Grid(cols, rows);
    generateMaze(grid);
    assert.equal(
      reachableCount(grid, grid.index(1, 1)),
      openCount(grid),
      `${cols}x${rows} maze is not fully connected`
    );
  }
});

test('carveAccess reaches the maze from every corner, at even sizes', () => {
  for (const size of [10, 24, 46, 60]) {
    engine.seed(size * 31);
    const grid = new Grid(size, size);
    generateMaze(grid);

    const corners = [
      grid.index(0, 0),
      grid.index(size - 1, 0),
      grid.index(0, size - 1),
      grid.index(size - 1, size - 1),
    ];
    for (const corner of corners) carveAccess(grid, corner);

    for (const corner of corners) {
      assert.ok(grid.isOpen(corner), `${size}: corner ${corner} left walled`);
      const search = new Search(grid, grid.index(1, 1), corner, FOUR_WAY);
      search.solve();
      assert.equal(search.status, SearchStatus.FOUND, `${size}: corner ${corner} is cut off from the maze`);
    }
  }
});

test('a maze too small to carve degrades to an open board', () => {
  for (const size of [1, 2, 3, 4]) {
    const grid = new Grid(size, size);
    generateMaze(grid);
    assert.equal(openCount(grid), grid.size, `${size}x${size} should fall back to no walls at all`);
  }
});

test('parent chains never loop, even with reopening', () => {
  // A cheaper route into a settled cell rewrites its parent. If that could ever
  // point back into the cell's own descendants, path reconstruction would spin.
  const movement = { diagonal: true, cutCorners: false };

  for (const options of [
    { algorithm: 'astar', heuristic: 'manhattan', weight: 1, ...movement },
    { algorithm: 'astar', heuristic: 'octile', weight: 2.5, ...movement },
    { algorithm: 'greedy', heuristic: 'octile', ...movement },
  ]) {
    for (let seed = 1; seed <= 15; seed++) {
      engine.seed(seed * 61);
      const grid = new Grid(26, 26);
      grid.randomize(0.3, [0, grid.size - 1]);

      const search = new Search(grid, 0, grid.size - 1, options);
      search.solve();

      for (let i = 0; i < grid.size; i++) {
        if (search.parent[i] === -1) continue;
        const seen = new Set([i]);
        let cursor = search.parent[i];
        while (cursor !== -1) {
          assert.ok(!seen.has(cursor), `parent chain from ${i} loops at ${cursor}`);
          seen.add(cursor);
          cursor = search.parent[cursor];
          assert.ok(seen.size <= grid.size, 'parent chain is longer than the board');
        }
      }
    }
  }
});

test('the heap survives being emptied and refilled', () => {
  const keys = new Float64Array(64);
  const heap = new MinHeap(64, (a, b) => keys[a] - keys[b]);

  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < 64; i++) {
      keys[i] = (i * 37) % 64;
      heap.push(i);
    }
    assert.equal(heap.size, 64);
    while (!heap.isEmpty) heap.pop();
    assert.equal(heap.size, 0);
    for (let i = 0; i < 64; i++) assert.equal(heap.has(i), false, 'membership must be cleared on pop');
  }
});

test('clear() resets membership as well as contents', () => {
  const heap = new MinHeap(16, (a, b) => a - b);
  for (let i = 0; i < 16; i++) heap.push(i);
  heap.clear();

  assert.equal(heap.size, 0);
  assert.ok(heap.isEmpty);
  for (let i = 0; i < 16; i++) assert.equal(heap.has(i), false);
  heap.push(9);
  assert.equal(heap.pop(), 9);
});

test('accumulated diagonal costs stay exact enough to compare', () => {
  // g is built by repeatedly adding √2. Over a long run the drift must stay far
  // below the 1e-9 tolerance the optimality tests rely on.
  const grid = new Grid(100, 100);
  const search = new Search(grid, grid.index(0, 0), grid.index(99, 99), EIGHT_WAY);
  search.solve();

  assert.equal(search.status, SearchStatus.FOUND);
  const exact = 99 * Math.SQRT2;
  assert.ok(
    Math.abs(search.pathCost - exact) < 1e-9,
    `99 diagonal steps drifted: ${search.pathCost} vs ${exact}`
  );
});

test('a search over the largest board the UI allows completes', () => {
  engine.seed(4242);
  const grid = new Grid(100, 100);
  grid.randomize(0.25, [0, grid.size - 1]);

  const started = performance.now();
  const search = new Search(grid, 0, grid.size - 1, EIGHT_WAY);
  search.solve();
  const elapsed = performance.now() - started;

  assert.ok(search.isFinished);
  assert.ok(search.expansions <= grid.size * 2, `expanded ${search.expansions} on ${grid.size} cells`);
  assert.ok(elapsed < 500, `a 100x100 search took ${elapsed.toFixed(0)}ms`);
});
