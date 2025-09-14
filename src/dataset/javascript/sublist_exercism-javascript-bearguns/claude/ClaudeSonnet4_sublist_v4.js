'use strict'
class List {
  constructor(list = []) {
    this.list = list;
    this.length = list.length;
  }
  
  compare(other) {
    const thisLength = this.length;
    const otherLength = other.list.length;
    
    if (thisLength === otherLength) {
      for (let i = 0; i < thisLength; i++) {
        if (this.list[i] !== other.list[i]) {
          return 'UNEQUAL';
        }
      }
      return 'EQUAL';
    }
    
    if (thisLength === 0) {
      return 'SUBLIST';
    }
    
    if (otherLength === 0) {
      return 'SUPERLIST';
    }
    
    if (thisLength > otherLength) {
      return this._isSubsequence(other.list, this.list) ? 'SUPERLIST' : 'UNEQUAL';
    } else {
      return this._isSubsequence(this.list, other.list) ? 'SUBLIST' : 'UNEQUAL';
    }
  }
  
  _isSubsequence(shorter, longer) {
    const shortLen = shorter.length;
    const longLen = longer.length;
    
    for (let i = 0; i <= longLen - shortLen; i++) {
      let match = true;
      for (let j = 0; j < shortLen; j++) {
        if (longer[i + j] !== shorter[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
    return false;
  }
}
export default List;