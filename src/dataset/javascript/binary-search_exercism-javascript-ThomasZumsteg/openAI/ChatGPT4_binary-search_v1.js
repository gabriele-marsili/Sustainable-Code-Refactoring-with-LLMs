function BinarySearch(items) {
  this.items = items;
  this.isSorted = this.items.every((item, i, arr) => i === 0 || arr[i - 1] <= item);
}

BinarySearch.prototype = {
  get array() {
    return this.isSorted ? this.items : undefined;
  },

  indexOf: function (item) {
    if (!this.isSorted) return -1;
    let min = 0, max = this.items.length - 1;
    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      if (this.items[mid] < item) {
        min = mid + 1;
      } else if (item < this.items[mid]) {
        max = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  },
};

export default BinarySearch;