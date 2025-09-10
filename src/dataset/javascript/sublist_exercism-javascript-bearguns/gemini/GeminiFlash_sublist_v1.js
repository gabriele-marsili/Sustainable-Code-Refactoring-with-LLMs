'use strict'
class List {
  constructor(list = []) {
    this.list = list;
  }
  compare(otherList) {
    const listA = this.list;
    const listB = otherList.list;

    if (listA.length === listB.length) {
      if (listA.every((value, index) => value === listB[index])) {
        return 'EQUAL';
      }
    }

    if (this.isSuperlist(listB, listA)) {
      return 'SUPERLIST';
    }

    if (this.isSuperlist(listA, listB)) {
      return 'SUBLIST';
    }

    return 'UNEQUAL';
  }

  isSuperlist(longList, shortList) {
    if (shortList.length === 0) {
      return true;
    }

    if (longList.length < shortList.length) {
      return false;
    }

    for (let i = 0; i <= longList.length - shortList.length; i++) {
      let found = true;
      for (let j = 0; j < shortList.length; j++) {
        if (longList[i + j] !== shortList[j]) {
          found = false;
          break;
        }
      }
      if (found) {
        return true;
      }
    }

    return false;
  }
}
export default List;