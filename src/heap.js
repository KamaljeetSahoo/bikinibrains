/**
 * An indexed binary min-heap over dense integer ids (0 .. capacity - 1).
 *
 * A* repeatedly asks "which frontier node has the smallest f?". A plain array
 * answers that with a linear scan, which costs O(n) every single expansion. A
 * binary heap answers it in O(log n).
 *
 * The "indexed" part matters: when A* finds a cheaper route to a node that is
 * already on the frontier, it must lower that node's key and re-sort it. We
 * track where each id currently lives in the heap array, so `update()` can sift
 * it back into place instead of pushing a duplicate and filtering stale entries
 * out later. That keeps `size` an honest count of the frontier, which is what
 * the UI displays.
 */
class MinHeap {
  /**
   * @param {number} capacity Highest id + 1. Ids outside this range are invalid.
   * @param {(a: number, b: number) => number} compare Negative if `a` sorts first.
   */
  constructor(capacity, compare) {
    this.compare = compare;
    this.ids = [];
    // position[id] is the index of `id` inside `ids`, or -1 when absent.
    this.position = new Int32Array(capacity).fill(-1);
  }

  get size() {
    return this.ids.length;
  }

  get isEmpty() {
    return this.ids.length === 0;
  }

  has(id) {
    return this.position[id] !== -1;
  }

  clear() {
    this.ids.length = 0;
    this.position.fill(-1);
  }

  push(id) {
    this.ids.push(id);
    this.position[id] = this.ids.length - 1;
    this.#siftUp(this.ids.length - 1);
  }

  /** Removes and returns the smallest id, or -1 when the heap is empty. */
  pop() {
    if (this.ids.length === 0) return -1;

    const top = this.ids[0];
    const last = this.ids.pop();
    this.position[top] = -1;

    if (this.ids.length > 0) {
      this.ids[0] = last;
      this.position[last] = 0;
      this.#siftDown(0);
    }
    return top;
  }

  /** Call after an id's key changed so it can move to its new position. */
  update(id) {
    const at = this.position[id];
    if (at === -1) return;
    this.#siftDown(this.#siftUp(at));
  }

  /** @returns {number} The index the item settled at. */
  #siftUp(index) {
    const { ids, position, compare } = this;
    const id = ids[index];

    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (compare(id, ids[parent]) >= 0) break;
      ids[index] = ids[parent];
      position[ids[index]] = index;
      index = parent;
    }

    ids[index] = id;
    position[id] = index;
    return index;
  }

  /** @returns {number} The index the item settled at. */
  #siftDown(index) {
    const { ids, position, compare } = this;
    const count = ids.length;
    const id = ids[index];

    for (;;) {
      const left = index * 2 + 1;
      if (left >= count) break;

      const right = left + 1;
      const child = right < count && compare(ids[right], ids[left]) < 0 ? right : left;
      if (compare(ids[child], id) >= 0) break;

      ids[index] = ids[child];
      position[ids[index]] = index;
      index = child;
    }

    ids[index] = id;
    position[id] = index;
    return index;
  }
}
