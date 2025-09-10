function BinarySearch(items) {
  this.items = items;
  this.sorted = undefined;
};

BinarySearch.prototype = {
  get array() {
    if (this.sorted !== undefined) {
      return this.sorted ? this.items : undefined;
    }

    if (this.items === null || this.items.length <= 1) {
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
    if (this.sorted === false) return -1;
    if (this.sorted === undefined) {
      this.array; // trigger the array getter to check if sorted
      if (this.sorted === false) return -1;
    }

    let low = 0;
    let high = this.items.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const guess = this.items[mid];

      if (guess === item) {
        return mid;
      }

      if (guess < item) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  },
};

export default BinarySearch;