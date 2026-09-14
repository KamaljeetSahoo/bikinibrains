/**
 * Maze generation.
 *
 * Random noise makes a decent obstacle field, but it does not really *test* a
 * pathfinder — there is almost always a route roughly towards the goal, so the
 * heuristic is right nearly all the time. A maze is the opposite: corridors
 * lead confidently in the wrong direction, and you get to watch A* commit to a
 * promising branch, exhaust it, and back out.
 */

/** Corridors live on odd coordinates; the even ones in between are the walls. */
function nearestCorridor(value, limit) {
  const odd = value % 2 === 1 ? value : value + 1;
  return Math.min(Math.max(odd, 1), limit % 2 === 1 ? limit - 2 : limit - 3);
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/**
 * Recursive backtracker (randomised depth-first search).
 *
 * Start somewhere, repeatedly tunnel to a random unvisited cell two steps away,
 * and when you run out of options rewind until you find one. It produces a
 * "perfect" maze: every cell reachable, exactly one route between any two.
 *
 * @param {Grid} grid
 * @param {number} braid Fraction of dead ends to reopen, 0..1. A perfect maze
 *   has a single solution, which makes every algorithm look alike; punching a
 *   few loops back in gives the search real choices to get wrong.
 */
function generateMaze(grid, braid = 0.15) {
  if (grid.cols < 5 || grid.rows < 5) {
    grid.clearWalls();
    return;
  }

  grid.fillWalls();

  const startCol = 1;
  const startRow = 1;
  const stack = [grid.index(startCol, startRow)];
  grid.setWall(stack[0], false);

  const steps = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];

  while (stack.length > 0) {
    const cell = stack[stack.length - 1];
    const col = grid.col(cell);
    const row = grid.row(cell);

    let carved = false;
    for (const [dc, dr] of shuffle(steps.slice())) {
      const c = col + dc;
      const r = row + dr;
      if (!grid.contains(c, r)) continue;

      const target = grid.index(c, r);
      if (grid.isOpen(target)) continue; // Already part of the maze.

      grid.setWall(grid.index(col + dc / 2, row + dr / 2), false); // Knock through.
      grid.setWall(target, false);
      stack.push(target);
      carved = true;
      break;
    }

    if (!carved) stack.pop();
  }

  if (braid > 0) braidDeadEnds(grid, braid);
}

/** Reopens a fraction of dead ends so the maze has loops instead of one route. */
function braidDeadEnds(grid, fraction) {
  const deadEnds = [];

  for (let row = 1; row < grid.rows - 1; row += 2) {
    for (let col = 1; col < grid.cols - 1; col += 2) {
      const index = grid.index(col, row);
      if (grid.isWall(index)) continue;

      let exits = 0;
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (grid.contains(col + dc, row + dr) && grid.isOpen(grid.index(col + dc, row + dr))) exits++;
      }
      if (exits <= 1) deadEnds.push(index);
    }
  }

  for (const index of deadEnds) {
    if (Math.random() > fraction) continue;

    const col = grid.col(index);
    const row = grid.row(index);
    const candidates = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]).filter(([dc, dr]) => {
      const c = col + dc;
      const r = row + dr;
      // Only knock out a wall that has another corridor on the far side.
      return grid.contains(c + dc, r + dr) && grid.isWall(grid.index(c, r)) && grid.isOpen(grid.index(c + dc, r + dr));
    });

    if (candidates.length > 0) {
      const [dc, dr] = candidates[0];
      grid.setWall(grid.index(col + dc, row + dr), false);
    }
  }
}

/**
 * Clears a corridor from an arbitrary cell to the maze proper, so that a start
 * or goal marker dropped anywhere is never walled in.
 */
function carveAccess(grid, index) {
  if (grid.cols < 5 || grid.rows < 5) return;

  const targetCol = nearestCorridor(grid.col(index), grid.cols);
  const targetRow = nearestCorridor(grid.row(index), grid.rows);

  let col = grid.col(index);
  let row = grid.row(index);
  grid.setWall(grid.index(col, row), false);

  while (col !== targetCol) {
    col += Math.sign(targetCol - col);
    grid.setWall(grid.index(col, row), false);
  }
  while (row !== targetRow) {
    row += Math.sign(targetRow - row);
    grid.setWall(grid.index(col, row), false);
  }
}
