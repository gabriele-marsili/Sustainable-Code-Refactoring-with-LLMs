export default class CustomSet {
  private values: Set<number>

  constructor(elements: number[] = []) {
    this.values = new Set(elements)
  }

  public empty(): boolean {
    return this.values.size === 0
  }

  public contains(num: number): boolean {
    return this.values.has(num)
  }

  public add(num: number): CustomSet {
    this.values.add(num)
    return this
  }

  public subset(that: CustomSet): boolean {
    for (const value of this.values) {
      if (!that.values.has(value)) {
        return false
      }
    }
    return true
  }

  public disjoint(that: CustomSet): boolean {
    for (const value of this.values) {
      if (that.values.has(value)) {
        return false
      }
    }
    return true
  }

  public eql(that: CustomSet): boolean {
    if (this.values.size !== that.values.size) {
      return false
    }
    return this.subset(that)
  }

  public intersection(that: CustomSet): CustomSet {
    const result = new Set<number>()
    for (const value of this.values) {
      if (that.values.has(value)) {
        result.add(value)
      }
    }
    return new CustomSet([...result])
  }

  public difference(that: CustomSet): CustomSet {
    const result = new Set<number>()
    for (const value of this.values) {
      if (!that.values.has(value)) {
        result.add(value)
      }
    }
    return new CustomSet([...result])
  }

  public union(that: CustomSet): CustomSet {
    const result = new Set([...this.values, ...that.values])
    return new CustomSet([...result])
  }
}