export default class CustomSet {
  private values: Set<number>;

  constructor(elements: number[] = []) {
    this.values = new Set(elements);
  }

  public empty(): boolean {
    return this.values.size === 0;
  }

  public contains(num: number): boolean {
    return this.values.has(num);
  }

  public add(num: number): CustomSet {
    this.values.add(num);
    return this;
  }

  public subset(that: CustomSet): boolean {
    for (const value of this.values) {
      if (!that.contains(value)) {
        return false;
      }
    }
    return true;
  }

  public disjoint(that: CustomSet): boolean {
    for (const value of this.values) {
      if (that.contains(value)) {
        return false;
      }
    }
    return true;
  }

  public eql(that: CustomSet): boolean {
    if (this.values.size !== that.values.size) {
      return false;
    }
    return this.subset(that);
  }

  public intersection(that: CustomSet): CustomSet {
    const intersectionSet = new Set<number>();
    for (const value of this.values) {
      if (that.contains(value)) {
        intersectionSet.add(value);
      }
    }
    return new CustomSet(Array.from(intersectionSet));
  }

  public difference(that: CustomSet): CustomSet {
    const differenceSet = new Set<number>();
    for (const value of this.values) {
      if (!that.contains(value)) {
        differenceSet.add(value);
      }
    }
    return new CustomSet(Array.from(differenceSet));
  }

  public union(that: CustomSet): CustomSet {
    const unionSet = new Set<number>(this.values);
    for (const element of that.values) {
      unionSet.add(element);
    }
    return new CustomSet(Array.from(unionSet));
  }
}