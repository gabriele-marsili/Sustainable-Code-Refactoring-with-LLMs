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
    } else if (listA.length > listB.length && this.isSublist(listB, listA)) {
      return 'SUPERLIST';
    } else if (listB.length > listA.length && this.isSublist(listA, listB)) {
      return 'SUBLIST';
    } else {
      return 'UNEQUAL';
    }
  }

  isSublist(sub, main) {
    for (let i = 0; i <= main.length - sub.length; i++) {
      if (sub.every((val, idx) => val === main[i + idx])) {
        return true;
      }
    }
    return false;
  }
}
export default List;