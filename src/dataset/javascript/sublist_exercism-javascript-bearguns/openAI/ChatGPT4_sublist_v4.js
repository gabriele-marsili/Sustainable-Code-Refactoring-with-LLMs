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
    } else if (listA.length > listB.length && listA.some((_, i) => listA.slice(i, i + listB.length).every((val, idx) => val === listB[idx]))) {
      return 'SUPERLIST';
    } else if (listB.length > listA.length && listB.some((_, i) => listB.slice(i, i + listA.length).every((val, idx) => val === listA[idx]))) {
      return 'SUBLIST';
    } else {
      return 'UNEQUAL';
    }
  }
}
export default List;