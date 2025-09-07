export class List {
  constructor(items) {
    this.items = items || [];
  }

  get values() {
    return this.items;
  }

  _duplicate(array) {
    return array.slice();
  }

  _flatten(array, result = []) {
    const stack = [...array];
    while (stack.length > 0) {
      const value = stack.pop();
      if (Array.isArray(value)) {
        stack.push(...value);
      } else {
        result.unshift(value);
      }
    }
    return result;
  }

  append(list) {
    this.items.push(...list.items);
    return this;
  }

  concat(list) {
    const concatenated = [...this.items];
    for (const itemOrList of list.items) {
      concatenated.push(itemOrList instanceof List ? itemOrList.items : itemOrList);
    }
    const flattened = this._flatten(concatenated);
    return new List(flattened.filter(item => typeof item !== 'undefined'));
  }

  filter(validateFn) {
    return new List(this.items.filter(validateFn));
  }

  map(modifierFn) {
    return new List(this.items.map(modifierFn));
  }

  length() {
    return this.items.length;
  }

  foldl(foldFn, initialValue) {
    return this.items.reduce(foldFn, initialValue);
  }

  foldr(foldFn, initialValue) {
    return this.items.reduceRight(foldFn, initialValue);
  }

  reverse() {
    return new List([...this.items].reverse());
  }
}