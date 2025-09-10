'use strict'
class List {
  constructor(list = []) {
    this.list = list;
  }
  compare(otherList) {
    const listA = this.list;
    const listB = otherList.list;

    if (listA.length !== listB.length) {
      if (listA.length > listB.length) {
        if (this.isSuperlist(listB)) return 'SUPERLIST';
      } else {
        if (otherList.isSuperlist(listA)) return 'SUBLIST';
      }
      return 'UNEQUAL';
    }

    if (this.isEqual(otherList)) return 'EQUAL';

    return 'UNEQUAL';
  }

  isEqual(otherList) {
    const listA = this.list;
    const listB = otherList.list;
    if (listA.length !== listB.length) return false;
    for (let i = 0; i < listA.length; i++) {
      if (listA[i] !== listB[i]) return false;
    }
    return true;
  }

  isSuperlist(sublist) {
    const listA = this.list;
    const listB = sublist;
    if (listB.length === 0 && listA.length > 0) return true;
    if (listA.length < listB.length) return false;

    for (let i = 0; i <= listA.length - listB.length; i++) {
      let found = true;
      for (let j = 0; j < listB.length; j++) {
        if (listA[i + j] !== listB[j]) {
          found = false;
          break;
        }
      }
      if (found) return true;
    }

    return false;
  }
}

export default List;