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
    for (let i = 0, length = array.length; i < length; i++) {
      const value = array[i];
      if (Array.isArray(value)) {
        this._flatten(value, result);
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
    for (let index = 0, length = list.items.length; index < length; index++) {
      const itemOrList = list.items[index];
      concatenated.push(itemOrList instanceof List ? itemOrList.items : itemOrList);
    }
    const flattened = this._flatten(concatenated);
    return new List(flattened.filter(item => typeof item !== 'undefined'));
  }

  filter(validateFn) {
    const filtered = [];
    for (let index = 0, length = this.items.length; index < length; index++) {
      const item = this.items[index];
      if (validateFn(item)) {
        filtered.push(item);
      }
    }
    return new List(filtered);
  }

  map(modifierFn) {
    const mapped = new Array(this.items.length);
    for (let index = 0, length = this.items.length; index < length; index++) {
      mapped[index] = modifierFn(this.items[index]);
    }
    return new List(mapped);
  }

  length() {
    return this.items.length;
  }

  foldl(foldFn, initialValue) {
    let accumulator = initialValue;
    for (let index = 0, length = this.items.length; index < length; index++) {
      accumulator = foldFn(accumulator, this.items[index]);
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
    const reversed = new Array(this.items.length);
    for (let itemsIndex = this.items.length - 1, reversedIndex = 0; itemsIndex >= 0; itemsIndex--, reversedIndex++) {
      reversed[reversedIndex] = this.items[itemsIndex];
    }
    return new List(reversed);
  }
}