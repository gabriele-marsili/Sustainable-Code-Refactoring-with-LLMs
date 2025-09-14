'use strict'
class List {
  constructor(list = []) {
    this.list = list;
  }
  compare(list) {
    const listA = this.list;
    const listB = list.list;
    const lenA = listA.length;
    const lenB = listB.length;
    
    if (lenA === lenB) {
      for (let i = 0; i < lenA; i++) {
        if (listA[i] !== listB[i]) {
          return 'UNEQUAL';
        }
      }
      return 'EQUAL';
    }
    
    if (lenA > lenB) {
      if (lenB === 0) return 'SUPERLIST';
      for (let i = 0; i <= lenA - lenB; i++) {
        let match = true;
        for (let j = 0; j < lenB; j++) {
          if (listA[i + j] !== listB[j]) {
            match = false;
            break;
          }
        }
        if (match) return 'SUPERLIST';
      }
    } else {
      if (lenA === 0) return 'SUBLIST';
      for (let i = 0; i <= lenB - lenA; i++) {
        let match = true;
        for (let j = 0; j < lenA; j++) {
          if (listB[i + j] !== listA[j]) {
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