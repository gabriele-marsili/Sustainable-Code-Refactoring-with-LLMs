enum ListComparisons {
  Equal = 'equal',
  Sublist = 'sublist',
  Superlist = 'superlist',
  Unequal = 'unequal'
}

export default class List {
  private readonly _values: number[]

  constructor(...args: number[]) {
    this._values = args
  }

  public compare(that: List): string {
    const list1 = this._values;
    const list2 = that._values;
    const len1 = list1.length;
    const len2 = list2.length;

    if (len1 === 0 && len2 === 0) {
      return ListComparisons.Equal;
    }

    if (len1 === len2) {
      if (len1 === 0) return ListComparisons.Equal;
      for (let i = 0; i < len1; i++) {
        if (list1[i] !== list2[i]) {
          return ListComparisons.Unequal;
        }
      }
      return ListComparisons.Equal;
    }

    let shorter: number[];
    let longer: number[];
    let shorterLen: number;
    let longerLen: number;
    let isSublist: boolean;

    if (len1 < len2) {
      shorter = list1;
      longer = list2;
      shorterLen = len1;
      longerLen = len2;
      isSublist = true;
    } else {
      shorter = list2;
      longer = list1;
      shorterLen = len2;
      longerLen = len1;
      isSublist = false;
    }

    if (shorterLen === 0) {
      return isSublist ? ListComparisons.Sublist : ListComparisons.Superlist;
    }

    for (let i = 0; i <= longerLen - shorterLen; i++) {
      let match = true;
      for (let j = 0; j < shorterLen; j++) {
        if (longer[i + j] !== shorter[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        return isSublist ? ListComparisons.Sublist : ListComparisons.Superlist;
      }
    }

    return ListComparisons.Unequal;
  }
}