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
    return this.values.size === that.values.size && this.subset(that);
  }

  public intersection(that: CustomSet): CustomSet {
    const values = [...this.values].filter((value) => that.contains(value));
    return new CustomSet(values);
  }

  public difference(that: CustomSet): CustomSet {
    const values = [...this.values].filter((value) => !that.contains(value));
    return new CustomSet(values);
  }

  public union(that: CustomSet): CustomSet {
    return new CustomSet([...this.values, ...that.values]);
  }
}