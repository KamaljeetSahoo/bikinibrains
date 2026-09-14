'use strict';

/**
 * Tests for the search engine.
 *
 * The browser files are plain classic scripts with no module system, which is
 * what lets the page run straight off the filesystem with no build step. To
 * test them under Node we do exactly what a browser does: evaluate each file in
 * one shared global scope, in order, and then read the classes back out.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = path.join(__dirname, '..', 'src');
const FILES = ['heap.js', 'grid.js', 'search.js', 'maze.js'];
const EXPORTS = '({ MinHeap, Grid, Search, CellState, SearchStatus, HEURISTICS, ALGORITHMS, generateMaze, carveAccess })';

/** Deterministic PRNG so a failure can be reproduced from its seed. */
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
const { MinHeap, Grid, Search, CellState, SearchStatus, HEURISTICS, generateMaze, carveAccess } = engine;

const ADMISSIBLE_WITH_DIAGONALS = ['octile', 'euclidean', 'chebyshev'];

function endpoints(grid) {
  return { start: grid.index(0, 0), goal: grid.index(grid.cols - 1, grid.rows - 1) };
}

/** Re-walks the returned route and checks every step was actually legal. */
function assertLegalPath(grid, search, options) {
  const route = search.path;
  assert.equal(route[0], search.start, 'path must begin at the start');
  assert.equal(route[route.length - 1], search.goal, 'path must end at the goal');

  let cost = 0;
  for (let k = 1; k < route.length; k++) {
    const from = route[k - 1];
    const to = route[k];
    assert.ok(!grid.isWall(to), `path walks through a wall at ${to}`);

    const dc = grid.col(to) - grid.col(from);
    const dr = grid.row(to) - grid.row(from);
    assert.ok(Math.abs(dc) <= 1 && Math.abs(dr) <= 1 && (dc !== 0 || dr !== 0), 'steps must be to an adjacent cell');

    if (dc !== 0 && dr !== 0) {
      assert.ok(options.diagonal, 'diagonal step taken while diagonals are disabled');
      if (!options.cutCorners) {
        assert.ok(!grid.isWall(grid.index(grid.col(to), grid.row(from))), 'path cut a corner');
        assert.ok(!grid.isWall(grid.index(grid.col(from), grid.row(to))), 'path cut a corner');
      }
      cost += Math.SQRT2;
    } else {
      cost += 1;
    }
  }

  assert.ok(Math.abs(cost - search.pathCost) < 1e-9, `reported cost ${search.pathCost} does not match the route's ${cost}`);
}

function solve(grid, options) {
  const { start, goal } = endpoints(grid);
  const search = new Search(grid, start, goal, options);
  search.solve();
  return search;
}

function randomGrid(size, density, seed) {
  engine.seed(seed);
  const grid = new Grid(size, size);
  const { start, goal } = endpoints(grid);
  grid.randomize(density, [start, goal]);
  return grid;
}

test('MinHeap pops ids in key order', () => {
  const keys = new Float64Array(200);
  const heap = new MinHeap(200, (a, b) => keys[a] - keys[b]);

  const random = mulberry32(7);
  for (let i = 0; i < 200; i++) {
    keys[i] = random();
    heap.push(i);
  }
  assert.equal(heap.size, 200);

  let previous = -Infinity;
  for (let i = 0; i < 200; i++) {
    const id = heap.pop();
    assert.ok(keys[id] >= previous, 'heap returned an out-of-order key');
    previous = keys[id];
  }
  assert.ok(heap.isEmpty);
  assert.equal(heap.pop(), -1, 'popping an empty heap returns -1');
});

test('MinHeap.update re-sorts an id after its key drops', () => {
  const keys = new Float64Array(50);
  const heap = new MinHeap(50, (a, b) => keys[a] - keys[b]);

  for (let i = 0; i < 50; i++) {
    keys[i] = i;
    heap.push(i);
  }

  keys[49] = -1;
  heap.update(49);
  assert.equal(heap.pop(), 49, 'the decreased key should now be the minimum');

  keys[0] = 100;
  heap.update(0);
  assert.equal(heap.pop(), 1, 'the increased key should no longer be the minimum');
  assert.equal(heap.size, 48);
});

test('MinHeap tracks membership', () => {
  const heap = new MinHeap(10, (a, b) => a - b);
  assert.equal(heap.has(3), false);
  heap.push(3);
  assert.equal(heap.has(3), true);
  heap.pop();
  assert.equal(heap.has(3), false);
});

test('A* with an admissible heuristic matches Dijkstra exactly', () => {
  let compared = 0;

  for (let seed = 1; seed <= 40; seed++) {
    for (const diagonal of [true, false]) {
      const movement = { diagonal, cutCorners: false };
      const grid = randomGrid(28, 0.3, seed * 31 + (diagonal ? 1 : 0));

      const reference = solve(grid, { algorithm: 'dijkstra', ...movement });
      if (reference.status !== SearchStatus.FOUND) continue;

      for (const heuristic of ADMISSIBLE_WITH_DIAGONALS.concat(diagonal ? [] : ['manhattan'])) {
        const found = solve(grid, { algorithm: 'astar', heuristic, weight: 1, ...movement });

        assert.equal(found.status, SearchStatus.FOUND, `${heuristic} failed to find a path Dijkstra found`);
        assert.ok(
          Math.abs(found.pathCost - reference.pathCost) < 1e-9,
          `seed ${seed}: ${heuristic} returned ${found.pathCost}, optimum is ${reference.pathCost}`
        );
        assertLegalPath(grid, found, movement);
        compared++;
      }
    }
  }

  assert.ok(compared > 100, `expected a meaningful number of comparisons, got ${compared}`);
});

test('every heuristic is exact on an empty grid for the movement it describes', () => {
  const grid = new Grid(20, 20);
  const distance = (key, dx, dy) => HEURISTICS[key].measure(dx, dy);

  // Four-way movement: Manhattan is the real distance.
  const fourWay = solve(grid, { algorithm: 'dijkstra', diagonal: false, cutCorners: false });
  assert.ok(Math.abs(fourWay.pathCost - distance('manhattan', 19, 19)) < 1e-9);

  // Eight-way movement with √2 diagonals: octile is the real distance.
  const eightWay = solve(grid, { algorithm: 'dijkstra', diagonal: true, cutCorners: false });
  assert.ok(Math.abs(eightWay.pathCost - distance('octile', 19, 19)) < 1e-9);
});

test('Manhattan overestimates once diagonals are legal, and the code says so', () => {
  const movement = { diagonal: true, cutCorners: false };
  assert.equal(HEURISTICS.manhattan.admissible(movement), false);
  assert.equal(HEURISTICS.octile.admissible(movement), true);

  const grid = new Grid(20, 20);
  const search = new Search(grid, grid.index(0, 0), grid.index(19, 19), {
    algorithm: 'astar',
    heuristic: 'manhattan',
    weight: 1,
    ...movement,
  });
  assert.equal(search.describeGuarantee().optimal, false, 'the UI must not claim optimality here');

  // And it is not merely theoretical: it really does return longer routes.
  let suboptimal = 0;
  for (let seed = 1; seed <= 30; seed++) {
    const board = randomGrid(24, 0.28, seed * 17);
    const optimum = solve(board, { algorithm: 'dijkstra', ...movement });
    if (optimum.status !== SearchStatus.FOUND) continue;
    const guess = solve(board, { algorithm: 'astar', heuristic: 'manhattan', weight: 1, ...movement });
    if (guess.pathCost > optimum.pathCost + 1e-9) suboptimal++;
  }
  assert.ok(suboptimal > 0, 'expected Manhattan to return a suboptimal path on at least one board');
});

test('Weighted A* stays within its promised bound', () => {
  const movement = { diagonal: true, cutCorners: false };

  for (const weight of [1.4, 2, 2.5]) {
    for (let seed = 1; seed <= 20; seed++) {
      const grid = randomGrid(26, 0.3, seed * 13 + weight * 100);
      const optimum = solve(grid, { algorithm: 'dijkstra', ...movement });
      if (optimum.status !== SearchStatus.FOUND) continue;

      const weighted = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight, ...movement });
      assert.equal(weighted.status, SearchStatus.FOUND);
      assertLegalPath(grid, weighted, movement);
      assert.ok(
        weighted.pathCost <= optimum.pathCost * weight + 1e-9,
        `w=${weight} seed=${seed}: cost ${weighted.pathCost} exceeds the ${weight}× bound on ${optimum.pathCost}`
      );
    }
  }
});

test('greedy best-first settles each cell once and stays quicker than Dijkstra', () => {
  const movement = { diagonal: true, cutCorners: false };
  let greedyTotal = 0;
  let dijkstraTotal = 0;

  for (let seed = 1; seed <= 30; seed++) {
    const grid = randomGrid(30, 0.3, seed * 23);
    const reference = solve(grid, { algorithm: 'dijkstra', ...movement });
    const greedy = solve(grid, { algorithm: 'greedy', heuristic: 'octile', ...movement });

    assert.equal(greedy.status, reference.status, 'greedy must agree on whether a path exists at all');
    // Greedy keeps a closed set, so no cell can ever be expanded twice.
    assert.ok(
      greedy.expansions <= grid.size,
      `greedy expanded ${greedy.expansions} cells on a ${grid.size}-cell grid, so it reopened some`
    );

    greedyTotal += greedy.expansions;
    dijkstraTotal += reference.expansions;

    if (greedy.status === SearchStatus.FOUND) {
      assertLegalPath(grid, greedy, movement);
      assert.ok(greedy.pathCost >= reference.pathCost - 1e-9, 'nothing may beat the optimum');
    }
  }

  // The whole point of greedy is that it is cheap. If it ever costs more than
  // Dijkstra, the page is teaching the opposite of the truth.
  assert.ok(greedyTotal < dijkstraTotal, `greedy ${greedyTotal} should beat Dijkstra ${dijkstraTotal}`);
});

test('corner cutting is refused unless it is asked for', () => {
  const grid = new Grid(3, 3);
  // A diagonal pinch: the only way from (0,0) to (2,2) squeezes past two walls.
  grid.setWall(grid.index(1, 0), true);
  grid.setWall(grid.index(0, 1), true);
  grid.setWall(grid.index(2, 1), true);
  grid.setWall(grid.index(1, 2), true);

  const strict = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false });
  assert.equal(strict.status, SearchStatus.UNREACHABLE, 'squeezing between two walls must be refused');

  const loose = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: true });
  assert.equal(loose.status, SearchStatus.FOUND);
  assertLegalPath(grid, loose, { diagonal: true, cutCorners: true });
});

test('an unreachable goal is reported rather than hung on', () => {
  const grid = new Grid(9, 9);
  for (let row = 0; row < 9; row++) grid.setWall(grid.index(4, row), true);

  const search = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false });
  assert.equal(search.status, SearchStatus.UNREACHABLE);
  assert.equal(search.path.length, 0);
  assert.equal(search.frontierSize, 0, 'the frontier must be exhausted');
  assert.ok(search.expansions > 0);
});

test('the goal is settled, not expanded', () => {
  const grid = new Grid(12, 12);
  const { start, goal } = endpoints(grid);
  const search = new Search(grid, start, goal, { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false });
  search.solve();

  assert.equal(search.status, SearchStatus.FOUND);
  assert.equal(search.state[goal], CellState.CLOSED);
  // Nothing may have been discovered *through* the goal.
  for (let i = 0; i < grid.size; i++) {
    assert.notEqual(search.parent[i], goal, 'the goal was expanded after being found');
  }
});

test('stepping one node at a time reaches the same answer as solving outright', () => {
  const options = { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false };
  const grid = randomGrid(24, 0.3, 4242);
  const { start, goal } = endpoints(grid);

  const stepped = new Search(grid, start, goal, options);
  let guard = grid.size * 8;
  while (!stepped.isFinished && guard-- > 0) stepped.run(1);

  const solved = solve(grid, options);
  assert.equal(stepped.status, solved.status);
  assert.equal(stepped.expansions, solved.expansions);
  assert.deepEqual(Array.from(stepped.path), Array.from(solved.path));
});

test('octile expands fewer nodes than Euclidean for the same answer', () => {
  const movement = { diagonal: true, cutCorners: false };
  let octileTotal = 0;
  let euclideanTotal = 0;

  for (let seed = 1; seed <= 25; seed++) {
    const grid = randomGrid(40, 0.25, seed * 11);
    const octile = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight: 1, ...movement });
    const euclidean = solve(grid, { algorithm: 'astar', heuristic: 'euclidean', weight: 1, ...movement });
    if (octile.status !== SearchStatus.FOUND) continue;

    assert.ok(Math.abs(octile.pathCost - euclidean.pathCost) < 1e-9, 'both are admissible, so both must be optimal');
    octileTotal += octile.expansions;
    euclideanTotal += euclidean.expansions;
  }

  assert.ok(octileTotal < euclideanTotal, `octile ${octileTotal} should beat euclidean ${euclideanTotal}`);
});

test('generated mazes are fully connected', () => {
  for (let seed = 1; seed <= 12; seed++) {
    engine.seed(seed * 97);
    const grid = new Grid(41, 41);
    generateMaze(grid);

    const start = grid.index(1, 1);
    assert.ok(grid.isOpen(start));

    // Flood fill orthogonally from the first corridor cell.
    const seen = new Uint8Array(grid.size);
    const stack = [start];
    seen[start] = 1;
    let reached = 1;
    while (stack.length > 0) {
      const cell = stack.pop();
      const col = grid.col(cell);
      const row = grid.row(cell);
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (!grid.contains(col + dc, row + dr)) continue;
        const next = grid.index(col + dc, row + dr);
        if (seen[next] || grid.isWall(next)) continue;
        seen[next] = 1;
        reached++;
        stack.push(next);
      }
    }

    let open = 0;
    for (let i = 0; i < grid.size; i++) if (grid.isOpen(i)) open++;
    assert.equal(reached, open, `seed ${seed}: maze has ${open - reached} unreachable open cells`);
    assert.ok(open > grid.size * 0.3, 'a maze should be mostly corridor, not mostly wall');
  }
});

test('carveAccess connects an arbitrary cell to the maze', () => {
  for (let seed = 1; seed <= 10; seed++) {
    engine.seed(seed * 3607);
    const grid = new Grid(31, 31);
    generateMaze(grid);

    const start = grid.index(0, 0);
    const goal = grid.index(30, 30);
    carveAccess(grid, start);
    carveAccess(grid, goal);

    const search = new Search(grid, start, goal, {
      algorithm: 'astar',
      heuristic: 'octile',
      weight: 1,
      diagonal: false,
      cutCorners: false,
    });
    search.solve();
    assert.equal(search.status, SearchStatus.FOUND, `seed ${seed}: corner of a maze was walled off`);
  }
});

test('a search on a wide-open board runs straight at the goal', () => {
  const grid = new Grid(50, 50);
  const search = solve(grid, { algorithm: 'astar', heuristic: 'octile', weight: 1, diagonal: true, cutCorners: false });

  assert.equal(search.status, SearchStatus.FOUND);
  // With an exact heuristic and a goal-leaning tie-break there is nothing to
  // explore: the search should walk almost directly there.
  assert.ok(search.expansions < 200, `expected a near-direct walk, expanded ${search.expansions}`);
  assert.equal(search.path.length, 50);
});
