export class List {
  constructor(items) {
    this.items = items || [];
  }

  get values() {
    return this.items;
  }

  _duplicate(array) {
    return [...array];
  }

  _flatten(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      if (Array.isArray(value)) {
        result.push(...this._flatten(value));
      } else {
        result.push(value);
      }
    }
    return result;
  }

  append(list) {
    this.items.push(...list.items);
    return this;
  }

  concat(list) {
    const concatenated = this._duplicate(this.items);
    for (const itemOrList of list.items) {
      if (itemOrList instanceof List) {
        concatenated.push(...itemOrList.items);
      } else {
        concatenated.push(itemOrList);
      }
    }
    const flattened = this._flatten(concatenated);
    return new List(flattened.filter(item => typeof item !== 'undefined'));
  }

  filter(validateFn) {
    const filtered = this.items.filter(validateFn);
    return new List(filtered);
  }

  map(modifierFn) {
    const mapped = this.items.map(modifierFn);
    return new List(mapped);
  }

  length() {
    return this.items.length;
  }

  foldl(foldFn, initialValue) {
    let accumulator = initialValue;
    for (const item of this.items) {
      accumulator = foldFn(accumulator, item);
    }
    return accumulator;
  }

  foldr(foldFn, initialValue) {
    let accumulator = initialValue;
    for (let index = this.items.length - 1; index >= 0; index--) {
      accumulator = foldFn(accumulator, this.items[index]);
    }
    return accumulator;
  }

  reverse() {
    const reversed = [...this.items].reverse();
    return new List(reversed);
  }
}