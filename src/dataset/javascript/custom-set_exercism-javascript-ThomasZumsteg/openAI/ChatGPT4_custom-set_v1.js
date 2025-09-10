class CustomSet {
  constructor(items = []) {
    this.items = new Set(items);
  }

  member(item) {
    return this.items.has(item);
  }

  size() {
    return this.items.size;
  }

  toList() {
    return Array.from(this.items);
  }

  put(item) {
    this.items.add(item);
    return this;
  }

  eql(set_b) {
    if (this.size() !== set_b.size()) return false;
    for (const item of this.items) {
      if (!set_b.member(item)) return false;
    }
    return true;
  }

  delete(item) {
    this.items.delete(item);
    return this;
  }

  difference(set_b) {
    return new CustomSet([...this.items].filter(item => !set_b.member(item)));
  }

  disjoint(set_b) {
    for (const item of this.items) {
      if (set_b.member(item)) return false;
    }
    return true;
  }

  empty() {
    this.items.clear();
    return this;
  }

  intersection(set_b) {
    return new CustomSet([...this.items].filter(item => set_b.member(item)));
  }

  subset(set_b) {
    for (const item of set_b.items) {
      if (!this.member(item)) return false;
    }
    return true;
  }

  union(set_b) {
    return new CustomSet([...this.items, ...set_b.items]);
  }
}

export default CustomSet;