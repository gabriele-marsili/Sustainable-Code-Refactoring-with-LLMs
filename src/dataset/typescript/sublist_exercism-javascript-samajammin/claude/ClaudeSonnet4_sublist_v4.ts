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
    const thisValues = this._values
    const thatValues = that._values
    const thisLength = thisValues.length
    const thatLength = thatValues.length

    if (thisLength === thatLength) {
      if (thisLength === 0) return ListComparisons.Equal
      
      for (let i = 0; i < thisLength; i++) {
        if (thisValues[i] !== thatValues[i]) {
          return ListComparisons.Unequal
        }
      }
      return ListComparisons.Equal
    }

    if (thisLength === 0) return ListComparisons.Sublist
    if (thatLength === 0) return ListComparisons.Superlist

    const [longList, shortList, longLength, shortLength, isThisLonger] = 
      thisLength > thatLength 
        ? [thisValues, thatValues, thisLength, thatLength, true]
        : [thatValues, thisValues, thatLength, thisLength, false]

    const maxStartIndex = longLength - shortLength

    for (let i = 0; i <= maxStartIndex; i++) {
      if (longList[i] === shortList[0]) {
        let match = true
        for (let j = 1; j < shortLength; j++) {
          if (longList[i + j] !== shortList[j]) {
            match = false
            break
          }
        }
        if (match) {
          return isThisLonger ? ListComparisons.Superlist : ListComparisons.Sublist
        }
      }
    }

    return ListComparisons.Unequal
  }
}