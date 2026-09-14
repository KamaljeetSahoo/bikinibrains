/**
 * Canvas rendering.
 *
 * The renderer owns no state about the search — it is handed a `Grid` and a
 * `Search` and draws whatever they currently say. Every colour comes from a CSS
 * custom property on the page, so the canvas restyles itself along with the
 * rest of the UI when the theme changes, and there is exactly one place to edit
 * a colour.
 *
 * Draw order matters and is deliberate: the lattice goes *under* the cells, so
 * that explored ground resolves from a grid of pips into one solid field as the
 * search settles it.
 */

const CELL_FADE_MS = 260;
const PATH_DRAW_MS = 520;
const ISOLATE_MS = 140;
/** How far non-isolated layers fade when a legend row is pointed at. */
const ISOLATE_DEPTH = 0.86;

/**
 * Normalises any CSS colour to {r, g, b} by asking the canvas to parse it.
 * Cheaper than writing a parser, and it understands every notation the browser
 * does — hex, rgb(), hsl(), oklch().
 */
const colorProbe = document.createElement('canvas').getContext('2d');

function parseColor(value) {
  colorProbe.fillStyle = '#000000';
  colorProbe.fillStyle = value.trim() || '#000000';
  const normalized = colorProbe.fillStyle;

  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1);
    const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  }

  const [r, g, b] = normalized.match(/[\d.]+/g).map(Number);
  return { r, g, b };
}

/** Blends in a gamma-ish space so midpoints stay vivid instead of going muddy. */
function mix(a, b, t) {
  const blend = (x, y) => Math.round(Math.sqrt((1 - t) * x * x + t * y * y));
  return { r: blend(a.r, b.r), g: blend(a.g, b.g), b: blend(a.b, b.b) };
}

function rgba({ r, g, b }, alpha = 1) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cssWidth = 0;
    this.cssHeight = 0;
    this.palette = null;
    this.isolated = null;
    this.isolateMix = 0;
    this.lastFrameAt = 0;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduceMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (event) => {
      this.reduceMotion = event.matches;
    });
  }

  /** Re-reads every colour token. Call on theme change. */
  refreshPalette() {
    const styles = getComputedStyle(document.documentElement);
    const token = (name) => parseColor(styles.getPropertyValue(name));

    this.palette = {
      board: token('--canvas-board'),
      gridLine: token('--canvas-grid-line'),
      wall: token('--canvas-wall'),
      visitedNear: token('--canvas-visited-near'),
      visitedFar: token('--canvas-visited-far'),
      frontier: token('--canvas-frontier'),
      path: token('--canvas-path'),
      pathCasing: token('--canvas-path-casing'),
      pathGlow: token('--canvas-path-glow'),
      start: token('--canvas-start'),
      goal: token('--canvas-goal'),
      cursor: token('--canvas-cursor'),
    };
    // Walls carry a rim a shade darker than their face, which keeps them
    // legible against the search wake by shape as well as by brightness.
    this.palette.wallRim = mix(this.palette.wall, this.palette.board, 0.5);
  }

  /**
   * Matches the drawing buffer to the element's real pixel size so the grid
   * stays crisp on high-density displays.
   */
  resize(grid) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.cssWidth = width;
    this.cssHeight = height;
    this.cellSize = Math.min(width / grid.cols, height / grid.rows);
    this.offsetX = (width - this.cellSize * grid.cols) / 2;
    this.offsetY = (height - this.cellSize * grid.rows) / 2;
  }

  /** Maps a pointer position to a cell id, or -1 when outside the board. */
  cellAt(clientX, clientY, grid) {
    const rect = this.canvas.getBoundingClientRect();
    const col = Math.floor((clientX - rect.left - this.offsetX) / this.cellSize);
    const row = Math.floor((clientY - rect.top - this.offsetY) / this.cellSize);
    return grid.contains(col, row) ? grid.index(col, row) : -1;
  }

  centerOf(index, grid) {
    return {
      x: this.offsetX + (grid.col(index) + 0.5) * this.cellSize,
      y: this.offsetY + (grid.row(index) + 0.5) * this.cellSize,
    };
  }

  /** Dims every layer except this one. Pass null to show everything. */
  setIsolation(layer) {
    this.isolated = layer;
  }

  /** Alpha multiplier for a layer, given whatever the legend is isolating. */
  #layerAlpha(layer) {
    if (!this.isolateMix || this.isolated === layer) return 1;
    return 1 - ISOLATE_DEPTH * this.isolateMix;
  }

  /**
   * @param {Grid} grid
   * @param {Search} search
   * @param {{now: number, hoverIndex: number, cursorIndex: number, finishedAt: number}} view
   */
  draw(grid, search, view) {
    if (!this.palette) this.refreshPalette();

    const { ctx, palette, cellSize } = this;
    const now = view.now;

    // Ease the isolation dim so pointing at a legend row is a transition, not
    // a flicker.
    const elapsed = this.lastFrameAt ? now - this.lastFrameAt : 16;
    this.lastFrameAt = now;
    const target = this.isolated ? 1 : 0;
    const stepAmount = this.reduceMotion ? 1 : Math.min(1, elapsed / ISOLATE_MS);
    this.isolateMix += (target - this.isolateMix) * stepAmount;
    if (Math.abs(target - this.isolateMix) < 0.004) this.isolateMix = target;

    ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    ctx.fillStyle = rgba(palette.board);
    ctx.fillRect(this.offsetX, this.offsetY, cellSize * grid.cols, cellSize * grid.rows);

    this.#drawGridLines(grid);
    this.#drawCells(grid, search, now);
    this.#drawPath(grid, search, view);
    this.#drawEndpoints(grid, search);
    this.#drawCursors(grid, view);
  }

  #drawGridLines(grid) {
    if (this.cellSize < 9) return; // Below this the lines eat the cells.

    const { ctx, palette, cellSize } = this;
    ctx.save();
    ctx.strokeStyle = rgba(palette.gridLine);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let col = 0; col <= grid.cols; col++) {
      const x = Math.round(this.offsetX + col * cellSize) + 0.5;
      ctx.moveTo(x, this.offsetY);
      ctx.lineTo(x, this.offsetY + grid.rows * cellSize);
    }
    for (let row = 0; row <= grid.rows; row++) {
      const y = Math.round(this.offsetY + row * cellSize) + 0.5;
      ctx.moveTo(this.offsetX, y);
      ctx.lineTo(this.offsetX + grid.cols * cellSize, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  #drawCells(grid, search, now) {
    const { ctx, palette, cellSize } = this;
    const fade = this.reduceMotion ? 0 : CELL_FADE_MS;

    const wallAlpha = this.#layerAlpha('walls');
    const visitedAlpha = this.#layerAlpha('visited');
    const frontierAlpha = this.#layerAlpha('frontier');

    // Settled cells are shaded by how far the search had to travel to reach
    // them, which turns the closed set into a readable distance field rather
    // than an undifferentiated blob.
    const costScale = search && search.maxSettledG > 0 ? 1 / search.maxSettledG : 0;

    const radius = cellSize > 10 ? Math.min(3, cellSize * 0.18) : 0;
    const rim = cellSize > 11;

    for (let i = 0; i < grid.size; i++) {
      const x = this.offsetX + grid.col(i) * cellSize;
      const y = this.offsetY + grid.row(i) * cellSize;

      if (grid.isWall(i)) {
        if (wallAlpha <= 0.02) continue;
        ctx.fillStyle = rgba(palette.wall, wallAlpha);
        this.#roundedRect(x, y, cellSize, cellSize, radius);
        ctx.fill();
        if (rim) {
          ctx.strokeStyle = rgba(palette.wallRim, wallAlpha);
          ctx.lineWidth = 1;
          this.#roundedRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1, radius);
          ctx.stroke();
        }
        continue;
      }

      if (!search) continue;
      const state = search.state[i];
      if (state === CellState.UNVISITED) continue;

      const progress = fade === 0 ? 1 : easeOutCubic(Math.min(1, (now - search.changedAt[i]) / fade));
      if (progress <= 0) continue;

      if (state === CellState.CLOSED) {
        if (visitedAlpha <= 0.02) continue;
        const depth = Number.isFinite(search.g[i]) ? Math.min(1, search.g[i] * costScale) : 0;

        // Settled cells tile edge to edge with no corner radius, so explored
        // ground resolves out of the lattice into one continuous field. The
        // shade carries the distance travelled; the shape carries nothing.
        const shrink = (1 - progress) * cellSize * 0.3;
        ctx.fillStyle = rgba(mix(palette.visitedNear, palette.visitedFar, depth), visitedAlpha * progress);
        ctx.fillRect(x + shrink, y + shrink, cellSize - shrink * 2, cellSize - shrink * 2);
        continue;
      }

      if (frontierAlpha <= 0.02) continue;

      // The frontier is drawn as an inset pip rather than a full cell. It is
      // the brightest thing on the board, and at full bleed a scattering of
      // leftover frontier cells reads as damage rather than as pending work.
      const inset = cellSize * (0.16 + 0.3 * (1 - progress));
      ctx.fillStyle = rgba(palette.frontier, frontierAlpha * progress);
      this.#roundedRect(x + inset, y + inset, cellSize - inset * 2, cellSize - inset * 2, radius);
      ctx.fill();
    }
  }

  #drawPath(grid, search, view) {
    if (!search) return;

    const alpha = this.#layerAlpha('path');
    if (alpha <= 0.02) return;

    const settled = search.status === SearchStatus.FOUND;
    const route = settled ? search.path : search.current !== -1 ? search.tracePathFrom(search.current) : [];
    if (route.length < 2) return;

    const { ctx, palette, cellSize } = this;
    const points = route.map((index) => this.centerOf(index, grid));

    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // A* only ever steps orthogonally or at 45°, so the route is drawn as the
    // straight segments it really is. Smoothing it into a spline would be a
    // nice-looking lie about the data.
    const trace = () => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    };

    if (settled) {
      const reveal = this.reduceMotion
        ? 1
        : easeOutCubic(Math.min(1, (view.now - view.finishedAt) / PATH_DRAW_MS));

      const length = totalLength(points);
      ctx.setLineDash([length, length]);
      ctx.lineDashOffset = length * (1 - reveal);

      const core = Math.max(2, cellSize * 0.4);

      // A casing stroke underneath, in the board colour, guarantees the route
      // separates from whatever it happens to cross — wall, wake or open
      // ground — without relying on the palette to keep its distance.
      ctx.strokeStyle = rgba(palette.pathCasing, alpha * 0.95);
      ctx.lineWidth = core + Math.max(2, cellSize * 0.22);
      trace();

      ctx.shadowColor = rgba(palette.pathGlow, 0.6 * alpha);
      ctx.shadowBlur = Math.max(5, cellSize * 0.9);
      ctx.strokeStyle = rgba(palette.path, alpha);
      ctx.lineWidth = core;
      trace();
    } else {
      // The provisional route is faint and uncased: it is a guess that is
      // still changing, and it should not read as an answer.
      ctx.setLineDash([]);
      ctx.strokeStyle = rgba(palette.path, alpha * 0.45);
      ctx.lineWidth = Math.max(1.5, cellSize * 0.22);
      trace();
    }

    ctx.restore();
  }

  #drawEndpoints(grid, search) {
    if (!search) return;

    const alpha = this.#layerAlpha('endpoints');
    if (alpha <= 0.02) return;

    const { ctx, palette, cellSize } = this;
    const size = Math.max(7, cellSize * 1.6);

    // Start and goal are told apart by shape as well as colour — a solid block
    // you set off from, and a ring you are aiming at.
    const start = this.centerOf(search.start, grid);
    ctx.save();
    ctx.shadowColor = rgba(palette.start, 0.55 * alpha);
    ctx.shadowBlur = size * 0.6;
    ctx.fillStyle = rgba(palette.start, alpha);
    this.#roundedRect(start.x - size / 2, start.y - size / 2, size, size, size * 0.3);
    ctx.fill();
    ctx.restore();

    const goal = this.centerOf(search.goal, grid);
    ctx.save();
    ctx.shadowColor = rgba(palette.goal, 0.55 * alpha);
    ctx.shadowBlur = size * 0.6;
    ctx.strokeStyle = rgba(palette.goal, alpha);
    ctx.lineWidth = Math.max(2, size * 0.22);
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, size * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = rgba(palette.goal, alpha);
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, size * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  #drawCursors(grid, view) {
    const { ctx, palette, cellSize } = this;

    const outline = (index, width, dash) => {
      const x = this.offsetX + grid.col(index) * cellSize;
      const y = this.offsetY + grid.row(index) * cellSize;
      ctx.save();
      ctx.setLineDash(dash);
      ctx.strokeStyle = rgba(palette.cursor, 0.9);
      ctx.lineWidth = width;
      this.#roundedRect(x + width / 2, y + width / 2, cellSize - width, cellSize - width, Math.min(3, cellSize * 0.2));
      ctx.stroke();
      ctx.restore();
    };

    if (view.hoverIndex !== -1 && cellSize >= 5) outline(view.hoverIndex, 1.5, []);
    // The keyboard cursor is dashed so it never reads as the mouse pointer.
    if (view.cursorIndex !== -1 && cellSize >= 5) outline(view.cursorIndex, 2, [3, 2]);
  }

  #roundedRect(x, y, width, height, radius) {
    const ctx = this.ctx;
    ctx.beginPath();
    if (radius <= 0 || width <= radius * 2 || height <= radius * 2) {
      ctx.rect(x, y, width, height);
    } else {
      ctx.roundRect(x, y, width, height, radius);
    }
  }
}

function totalLength(points) {
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return length;
}
