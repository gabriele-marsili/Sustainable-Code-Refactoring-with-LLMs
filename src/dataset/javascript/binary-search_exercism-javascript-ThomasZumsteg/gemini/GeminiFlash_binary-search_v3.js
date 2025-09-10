function BinarySearch(items) {
  this.items = items;
  this.sorted = undefined;
};

BinarySearch.prototype = {
  get array() {
    if (this.sorted !== undefined) {
      return this.sorted ? this.items : undefined;
    }

    if (this.items === null || this.items === undefined || !Array.isArray(this.items)) {
      this.sorted = false;
      return undefined;
    }

    if (this.items.length <= 1) {
      this.sorted = true;
      return this.items;
    }

    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i] < this.items[i - 1]) {
        this.sorted = false;
        return undefined;
      }
    }

    this.sorted = true;
    return this.items;
  },

  indexOf: function(item) {
    const arr = this.items;
    if (!arr || !Array.isArray(arr)) {
      return -1;
    }

    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2); // Prevent potential overflow
      const midVal = arr[mid];

      if (midVal < item) {
        low = mid + 1;
      } else if (midVal > item) {
        high = mid - 1;
      } else {
        return mid;
      }
    }

    return -1;
  },
};

export default BinarySearch;