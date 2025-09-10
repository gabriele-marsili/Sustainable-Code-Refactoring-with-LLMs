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
    const [a, b] = [this._values, that._values];
    const [longList, shortList] = a.length >= b.length ? [a, b] : [b, a];
    const isShorter = a.length < b.length;

    if (shortList.length === 0) {
      return longList.length === 0
        ? ListComparisons.Equal
        : isShorter
        ? ListComparisons.Sublist
        : ListComparisons.Superlist;
    }

    const isSublist = (long: number[], short: number[]) =>
      long.some((_, i) =>
        i + short.length <= long.length &&
        short.every((val, j) => val === long[i + j])
      );

    if (longList.length === shortList.length) {
      return a.every((val, i) => val === b[i])
        ? ListComparisons.Equal
        : ListComparisons.Unequal;
    }

    return isSublist(longList, shortList)
      ? isShorter
        ? ListComparisons.Sublist
        : ListComparisons.Superlist
      : ListComparisons.Unequal;
  }
}