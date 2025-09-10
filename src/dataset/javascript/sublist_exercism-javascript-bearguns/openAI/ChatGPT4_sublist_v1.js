'use strict'
class List {
  constructor(list = []) {
    this.list = list;
  }
  compare(list) {
    const listA = this.list;
    const listB = list.list;

    if (listA.length === listB.length && listA.every((val, idx) => val === listB[idx])) {
      return 'EQUAL';
    } else if (listA.length > listB.length && listA.some((_, idx) => listA.slice(idx, idx + listB.length).every((val, i) => val === listB[i]))) {
      return 'SUPERLIST';
    } else if (listB.length > listA.length && listB.some((_, idx) => listB.slice(idx, idx + listA.length).every((val, i) => val === listA[i]))) {
      return 'SUBLIST';
    } else {
      return 'UNEQUAL';
    }
  }
}
export default List;