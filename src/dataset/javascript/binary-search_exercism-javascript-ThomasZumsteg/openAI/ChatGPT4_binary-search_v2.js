class BinarySearch {
  constructor(items) {
    this.items = items;
    this._isSorted = null;
  }

  get array() {
    if (this._isSorted === null) {
      this._isSorted = this.items.every((item, i, arr) => i === 0 || arr[i - 1] <= item);
    }
    return this._isSorted ? this.items : undefined;
  }

  indexOf(item) {
    if (!this.array) return -1;

    let min = 0;
    let max = this.items.length - 1;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      if (this.items[mid] === item) {
        return mid;
      } else if (this.items[mid] < item) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    return -1;
  }
}

export default BinarySearch;