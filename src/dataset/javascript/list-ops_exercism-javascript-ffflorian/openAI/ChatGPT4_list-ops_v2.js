export class List {
  constructor(items = []) {
    this.items = items;
  }

  get values() {
    return this.items;
  }

  _duplicate(array) {
    return array.slice();
  }

  _flatten(array) {
    return array.flat(Infinity);
  }

  append(list) {
    this.items.push(...list.items);
    return this;
  }

  concat(list) {
    const concatenated = this.items.concat(
      list.items.map(item => (item instanceof List ? item.items : item))
    );
    const flattened = this._flatten(concatenated);
    return new List(flattened.filter(item => item !== undefined));
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