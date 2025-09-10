'use strict'
class List {
  constructor(list = []) {
    this.list = list;
  }
  compare(list) {
    const lenA = this.list.length;
    const lenB = list.list.length;

    if (lenA === lenB) {
      if (lenA === 0 && lenB === 0) return 'EQUAL';
      for (let i = 0; i < lenA; i++) {
        if (this.list[i] !== list.list[i]) {
          break;
        }
        if (i === lenA - 1) return 'EQUAL';
      }
    }

    if (lenA > lenB) {
      if (lenB === 0) return 'SUPERLIST';
      for (let i = 0; i <= lenA - lenB; i++) {
        let match = true;
        for (let j = 0; j < lenB; j++) {
          if (this.list[i + j] !== list.list[j]) {
            match = false;
            break;
          }
        }
        if (match) return 'SUPERLIST';
      }
    } else if (lenB > lenA) {
      if (lenA === 0) return 'SUBLIST';
      for (let i = 0; i <= lenB - lenA; i++) {
        let match = true;
        for (let j = 0; j < lenA; j++) {
          if (list.list[i + j] !== this.list[j]) {
            match = false;
            break;
          }
        }
        if (match) return 'SUBLIST';
      }
    }

    return 'UNEQUAL';
  }
}
export default List;