export default class CustomSet {
  private values: Set<number>

  constructor(elements: number[] = []) {
    this.values = new Set(elements)
  }

  // calculates if set is empty
  public empty(): boolean {
    return this.values.size === 0
  }

  // calculates if set contains a value
  public contains(num: number): boolean {
    return this.values.has(num)
  }

  // adds an element to the set
  public add(num: number): CustomSet {
    this.values.add(num)
    return this
  }

  // calculates if all elements of this set are contained in that set
  public subset(that: CustomSet): boolean {
    for (const value of this.values) {
      if (!that.values.has(value)) {
        return false
      }
    }
    return true
  }

  // calculates if all elements of this set are not contained in that set
  public disjoint(that: CustomSet): boolean {
    for (const value of this.values) {
      if (that.values.has(value)) {
        return false
      }
    }
    return true
  }

  // calculates if sets have all the same elements
  public eql(that: CustomSet): boolean {
    if (this.values.size !== that.values.size) {
      return false
    }
    return this.subset(that)
  }

  // return a set of all shared elements
  public intersection(that: CustomSet): CustomSet {
    const result = new Set<number>()
    for (const value of this.values) {
      if (that.values.has(value)) {
        result.add(value)
      }
    }
    return new CustomSet([...result])
  }

  // return a set of elements only in this set
  public difference(that: CustomSet): CustomSet {
    const result = new Set<number>()
    for (const value of this.values) {
      if (!that.values.has(value)) {
        result.add(value)
      }
    }
    return new CustomSet([...result])
  }

  // return a set of all elements in either set
  public union(that: CustomSet): CustomSet {
    const result = new Set([...this.values, ...that.values])
    return new CustomSet([...result])
  }
}