/**
 * The world the search runs on: a rectangular lattice of cells, each either
 * open or a wall.
 *
 * Cells are addressed by a single integer id (`row * cols + col`) rather than a
 * pair, so every per-cell array the search needs — costs, parents, visit state —
 * can be a flat typed array indexed directly by that id.
 */

const SQRT2 = Math.SQRT2;

/** Orthogonal steps, in reading order: right, down, left, up. */
const ORTHOGONAL_STEPS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

/** Diagonal steps, clockwise from down-right. */
const DIAGONAL_STEPS = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

class Grid {
  constructor(cols, rows) {
    this.resize(cols, rows);
  }

  resize(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.size = cols * rows;
    this.walls = new Uint8Array(this.size);
  }

  index(col, row) {
    return row * this.cols + col;
  }

  col(index) {
    return index % this.cols;
  }

  row(index) {
    return Math.floor(index / this.cols);
  }

  contains(col, row) {
    return col >= 0 && col < this.cols && row >= 0 && row < this.rows;
  }

  isWall(index) {
    return this.walls[index] === 1;
  }

  isOpen(index) {
    return this.walls[index] === 0;
  }

  setWall(index, value) {
    this.walls[index] = value ? 1 : 0;
  }

  clearWalls() {
    this.walls.fill(0);
  }

  fillWalls() {
    this.walls.fill(1);
  }

  /**
   * Scatters walls at random.
   * @param {number} density Fraction of cells to block, 0..1.
   * @param {number[]} keepOpen Cell ids that must stay walkable (start and goal).
   */
  randomize(density, keepOpen = []) {
    for (let i = 0; i < this.size; i++) {
      this.walls[i] = Math.random() < density ? 1 : 0;
    }
    for (const index of keepOpen) this.walls[index] = 0;
  }

  /**
   * Yields every walkable neighbour of `index` together with the cost of
   * stepping there. An orthogonal step costs 1; a diagonal step costs √2, which
   * is the real distance travelled — charging 1 for both would quietly make
   * diagonal routes look cheaper than they are.
   *
   * @param {number} index
   * @param {{diagonal: boolean, cutCorners: boolean}} movement
   */
  *neighbors(index, movement) {
    const col = this.col(index);
    const row = this.row(index);

    for (const [dc, dr] of ORTHOGONAL_STEPS) {
      const c = col + dc;
      const r = row + dr;
      if (!this.contains(c, r)) continue;
      const next = this.index(c, r);
      if (this.walls[next] === 1) continue;
      yield { index: next, cost: 1 };
    }

    if (!movement.diagonal) return;

    for (const [dc, dr] of DIAGONAL_STEPS) {
      const c = col + dc;
      const r = row + dr;
      if (!this.contains(c, r)) continue;
      const next = this.index(c, r);
      if (this.walls[next] === 1) continue;

      // Corner rule: squeezing diagonally between two walls is a move no
      // physical agent could make, so it is rejected unless explicitly allowed.
      if (!movement.cutCorners) {
        const sideA = this.walls[this.index(c, row)] === 1;
        const sideB = this.walls[this.index(col, r)] === 1;
        if (sideA || sideB) continue;
      }

      yield { index: next, cost: SQRT2 };
    }
  }
}
