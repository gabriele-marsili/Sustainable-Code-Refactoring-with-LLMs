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

    // Handle equal length case first
    if (thisLength === thatLength) {
      if (thisLength === 0) return ListComparisons.Equal
      
      for (let i = 0; i < thisLength; i++) {
        if (thisValues[i] !== thatValues[i]) {
          return ListComparisons.Unequal
        }
      }
      return ListComparisons.Equal
    }

    // Determine which is longer/shorter
    const [longList, shortList, longLength, shortLength, isThisShorter] = 
      thisLength < thatLength 
        ? [thatValues, thisValues, thatLength, thisLength, true]
        : [thisValues, thatValues, thisLength, thatLength, false]

    // Empty short list is always a sublist
    if (shortLength === 0) {
      return isThisShorter ? ListComparisons.Sublist : ListComparisons.Superlist
    }

    // Check if short list is contained in long list
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
          return isThisShorter ? ListComparisons.Sublist : ListComparisons.Superlist
        }
      }
    }

    return ListComparisons.Unequal
  }
}