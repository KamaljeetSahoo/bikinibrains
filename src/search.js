/**
 * The search itself.
 *
 * `Search` is a *steppable* A*: one call to `step()` expands exactly one node.
 * That is what lets the page animate the algorithm instead of just printing its
 * answer — the render loop decides how many steps to take per frame, and the
 * search never knows it is being watched.
 *
 * Dijkstra and greedy best-first fall out of the same loop for free, because
 * all three differ only in how a frontier node is scored:
 *
 *   A*                f = g + w·h    (cost so far + estimate of cost to come)
 *   Dijkstra          f = g          (h = 0: no guessing, expand outwards evenly)
 *   Greedy best-first f = h          (ignore the road travelled, chase the goal)
 */

const CellState = Object.freeze({
  UNVISITED: 0,
  OPEN: 1,
  CLOSED: 2,
});

const SearchStatus = Object.freeze({
  READY: 'ready',
  RUNNING: 'running',
  FOUND: 'found',
  UNREACHABLE: 'unreachable',
});

/**
 * Every heuristic answers the same question — "roughly how far is it from here
 * to the goal, ignoring walls?" — and each is the *exact* answer for a
 * different set of legal moves.
 *
 * `admissible` decides whether the estimate is safe: a heuristic must never
 * overestimate, or A* can commit to a route before it has proof that route is
 * the cheapest.
 */
const HEURISTICS = {
  octile: {
    label: 'Octile',
    hint: 'Exact distance when diagonal steps are allowed.',
    measure: (dx, dy) => (dx > dy ? dx + (Math.SQRT2 - 1) * dy : dy + (Math.SQRT2 - 1) * dx),
    admissible: () => true,
  },
  manhattan: {
    label: 'Manhattan',
    hint: 'Exact distance for four-way movement. City blocks, no shortcuts.',
    measure: (dx, dy) => dx + dy,
    // With diagonals legal, walking dx + dy blocks is longer than the real
    // route, so this heuristic overestimates and A* loses its guarantee.
    admissible: (movement) => !movement.diagonal,
  },
  euclidean: {
    label: 'Euclidean',
    hint: 'Straight-line distance. Always safe, always an underestimate.',
    measure: (dx, dy) => Math.hypot(dx, dy),
    admissible: () => true,
  },
  chebyshev: {
    label: 'Chebyshev',
    hint: 'Exact when a diagonal step is priced the same as a straight one.',
    measure: (dx, dy) => Math.max(dx, dy),
    admissible: () => true,
  },
};

const ALGORITHMS = {
  astar: { label: 'A*', usesHeuristic: true, usesCost: true },
  dijkstra: { label: "Dijkstra", usesHeuristic: false, usesCost: true },
  greedy: { label: 'Greedy best-first', usesHeuristic: true, usesCost: false },
};

const DEFAULT_OPTIONS = {
  algorithm: 'astar',
  heuristic: 'octile',
  weight: 1,
  diagonal: true,
  cutCorners: false,
};

class Search {
  /**
   * @param {Grid} grid
   * @param {number} start Cell id.
   * @param {number} goal Cell id.
   * @param {Partial<typeof DEFAULT_OPTIONS>} options
   */
  constructor(grid, start, goal, options = {}) {
    this.grid = grid;
    this.start = start;
    this.goal = goal;
    this.options = { ...DEFAULT_OPTIONS, ...options };

    const { size } = grid;

    /** Cheapest known cost from the start to each cell. */
    this.g = new Float64Array(size).fill(Infinity);
    /** Heuristic estimate from each cell to the goal. */
    this.h = new Float64Array(size);
    /** Priority the frontier is sorted by. */
    this.f = new Float64Array(size).fill(Infinity);
    /** Which cell we arrived from, so the route can be walked back. */
    this.parent = new Int32Array(size).fill(-1);
    /** UNVISITED / OPEN / CLOSED, read by the renderer. */
    this.state = new Uint8Array(size);
    /** Timestamp of each cell's last state change, so it can fade in. */
    this.changedAt = new Float64Array(size);

    // Reopening a settled cell only earns its keep when the ordering actually
    // reads g. Greedy best-first sorts on h alone, so a cheaper route into a
    // closed cell cannot change when anything is popped — it just churns the
    // same cells through the frontier again. Greedy keeps the textbook closed
    // set; the cost-driven searches reopen.
    this.reopensClosedCells = ALGORITHMS[this.options.algorithm].usesCost;

    this.status = SearchStatus.READY;
    this.expansions = 0;
    this.elapsed = 0;
    this.current = -1;
    this.path = [];
    /** Largest g among settled cells, so the renderer can scale its cost ramp. */
    this.maxSettledG = 0;
    // Cells discovered in the same batch share one timestamp, so they fade in
    // together and the clock is read once per frame rather than once per cell.
    this.tick = performance.now();

    this.frontier = new MinHeap(size, (a, b) => {
      const byPriority = this.f[a] - this.f[b];
      if (byPriority !== 0) return byPriority;
      // Ties are everywhere on a uniform grid, and how they break is the
      // difference between a wide symmetric blob and a narrow beam. Preferring
      // the smaller h means — since f = g + w·h is equal — preferring the
      // larger g: the cell that is further along rather than the one that
      // merely looks promising. Unlike the usual trick of nudging h upwards,
      // this costs nothing in optimality.
      return this.h[a] - this.h[b];
    });

    this.g[start] = 0;
    this.h[start] = this.#estimate(start);
    this.f[start] = this.#priority(start);
    this.#markOpen(start);
  }

  get isFinished() {
    return this.status === SearchStatus.FOUND || this.status === SearchStatus.UNREACHABLE;
  }

  get frontierSize() {
    return this.frontier.size;
  }

  /** Total movement cost of the route found, or 0 if there isn't one yet. */
  get pathCost() {
    return this.status === SearchStatus.FOUND ? this.g[this.goal] : 0;
  }

  /**
   * Expands up to `budget` nodes and returns how many it actually managed.
   * Timing lives here rather than in `step()` so that reading the clock does
   * not dominate the measurement when hundreds of steps run per frame.
   */
  run(budget = 1) {
    if (this.isFinished) return 0;

    const startedAt = performance.now();
    this.tick = startedAt;
    let taken = 0;
    while (taken < budget && !this.isFinished) {
      this.step();
      taken++;
    }
    this.elapsed += performance.now() - startedAt;
    return taken;
  }

  /** Expands a single node. */
  step() {
    if (this.isFinished) return;
    this.status = SearchStatus.RUNNING;

    if (this.frontier.isEmpty) {
      // Every reachable cell has been examined and none of them was the goal.
      this.status = SearchStatus.UNREACHABLE;
      this.current = -1;
      return;
    }

    const current = this.frontier.pop();
    this.current = current;
    this.#markClosed(current);
    this.expansions++;

    // Stopping when the goal is *dequeued* — not when it is first discovered —
    // is what makes A* optimal. Reaching a cell only proves some route exists;
    // popping it proves no cheaper route is still outstanding.
    if (current === this.goal) {
      this.status = SearchStatus.FOUND;
      this.path = this.#reconstructPath();
      return;
    }

    for (const { index: neighbor, cost } of this.grid.neighbors(current, this.options)) {
      if (!this.reopensClosedCells && this.state[neighbor] === CellState.CLOSED) continue;

      const tentativeG = this.g[current] + cost;
      if (tentativeG >= this.g[neighbor]) continue; // Already know a route at least as good.

      this.parent[neighbor] = current;
      this.g[neighbor] = tentativeG;
      this.h[neighbor] = this.#estimate(neighbor);
      this.f[neighbor] = this.#priority(neighbor);

      if (this.state[neighbor] === CellState.OPEN) {
        this.frontier.update(neighbor); // Cheaper route found: re-sort it.
      } else {
        // UNVISITED cells join the frontier for the first time. CLOSED cells
        // are *reopened*, which matters more than it looks: a consistent
        // heuristic guarantees a cell is settled by its cheapest route the
        // first time it is popped, so closed cells could simply be skipped.
        // Weighting the heuristic, or picking one that overestimates, throws
        // that guarantee away — a better route can show up afterwards, and
        // without reopening the path silently degrades with no error.
        this.#markOpen(neighbor);
      }
    }
  }

  /** Runs to completion without animating. Used for the instant re-solve. */
  solve() {
    while (!this.isFinished) this.run(4096);
    return this.status;
  }

  /**
   * The route being considered right now, walked back from wherever the search
   * currently is. Redrawing this every frame is what makes the path appear to
   * writhe around as better options are discovered.
   */
  tracePathFrom(index) {
    const trace = [];
    let cursor = index;
    let guard = this.grid.size + 1;
    while (cursor !== -1 && guard-- > 0) {
      trace.push(cursor);
      if (cursor === this.start) break;
      cursor = this.parent[cursor];
    }
    return trace;
  }

  /**
   * A plain-language verdict on whether this configuration is actually
   * guaranteed to return the shortest route.
   */
  describeGuarantee() {
    const { algorithm, heuristic, weight, diagonal } = this.options;

    if (algorithm === 'dijkstra') {
      return { optimal: true, text: 'Guaranteed shortest path. Dijkstra never guesses.' };
    }
    if (algorithm === 'greedy') {
      return {
        optimal: false,
        text: 'No guarantee. Greedy best-first chases the goal and ignores distance travelled.',
      };
    }
    if (!HEURISTICS[heuristic].admissible({ diagonal })) {
      return {
        optimal: false,
        text: `${HEURISTICS[heuristic].label} overestimates once diagonal moves are legal, so the path may be longer than necessary.`,
      };
    }
    if (weight > 1) {
      return {
        optimal: false,
        text: `Weighted A* (w = ${weight.toFixed(1)}). Explores less, but the path can be up to ${weight.toFixed(1)}× longer than the optimum.`,
      };
    }
    return { optimal: true, text: 'Guaranteed shortest path. The heuristic never overestimates.' };
  }

  #estimate(index) {
    if (!ALGORITHMS[this.options.algorithm].usesHeuristic) return 0;
    const dx = Math.abs(this.grid.col(index) - this.grid.col(this.goal));
    const dy = Math.abs(this.grid.row(index) - this.grid.row(this.goal));
    return HEURISTICS[this.options.heuristic].measure(dx, dy);
  }

  #priority(index) {
    const { algorithm, weight } = this.options;
    if (algorithm === 'greedy') return this.h[index];
    if (algorithm === 'dijkstra') return this.g[index];
    return this.g[index] + weight * this.h[index];
  }

  #markOpen(index) {
    this.state[index] = CellState.OPEN;
    this.changedAt[index] = this.tick;
    this.frontier.push(index);
  }

  #markClosed(index) {
    this.state[index] = CellState.CLOSED;
    this.changedAt[index] = this.tick;
    if (this.g[index] > this.maxSettledG) this.maxSettledG = this.g[index];
  }

  #reconstructPath() {
    const route = this.tracePathFrom(this.goal);
    route.reverse();
    return route;
  }
}
