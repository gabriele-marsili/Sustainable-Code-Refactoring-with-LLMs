function BinarySearch(items) {
  this.items = items;
  this._isSorted = null;
}

BinarySearch.prototype = {
  get array() {
    if (this._isSorted !== null) {
      return this._isSorted ? this.items : undefined;
    }
    
    const len = this.items.length;
    for (let i = 1; i < len; i++) {
      if (this.items[i] < this.items[i - 1]) {
        this._isSorted = false;
        return undefined;
      }
    }
    
    this._isSorted = true;
    return this.items;
  },

  indexOf: function(item) {
    if (!this.array) return -1;
    
    let min = 0;
    let max = this.items.length - 1;
    
    while (min <= max) {
      const mid = (min + max) >>> 1;
      const midVal = this.items[mid];
      
      if (midVal < item) {
        min = mid + 1;
      } else if (midVal > item) {
        max = mid - 1;
      } else {
        return mid;
      }
    }
    
    return -1;
  }
};

export default BinarySearch;