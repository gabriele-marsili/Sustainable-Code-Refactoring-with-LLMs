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
    const listItems = list.items;
    const baseLength = concatenated.length;
    
    for (let index = 0; index < listItems.length; index++) {
      const itemOrList = listItems[index];
      concatenated[baseLength + index] = itemOrList instanceof List ? itemOrList.items : itemOrList;
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
    return new List(this.items.slice().reverse());
  }
}