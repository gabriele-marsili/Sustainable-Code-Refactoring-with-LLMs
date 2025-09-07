type ItemType<T> = Item<T> | null

class Item<T> {
  value: T
  next: ItemType<T>
  prev: ItemType<T>

  constructor(value: T, next: ItemType<T> = null, prev: ItemType<T> = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

export class List<TElement> {
  first: ItemType<TElement> = null
  last: ItemType<TElement> = null
  private _length: number = 0;

  public static create<Type>(...values: Type[]): List<Type> {
    const list = new List<Type>();
    for (let i = 0; i < values.length; i++) {
      list.push(values[i]);
    }
    return list;
  }

  push(value: TElement): void {
    const item = new Item<TElement>(value);

    if (this.last) {
      this.last.next = item;
      item.prev = this.last;
      this.last = item;
    } else {
      this.first = this.last = item;
    }
    this._length++;
  }

  unshift(value: TElement): void {
    const item = new Item<TElement>(value);

    if (this.first) {
      this.first.prev = item;
      item.next = this.first;
      this.first = item;
    } else {
      this.first = this.last = item;
    }
    this._length++;
  }

  forEach(callbackFn: (value: TElement) => void): void {
    let currItem = this.first;

    while (currItem) {
      callbackFn(currItem.value);
      currItem = currItem.next;
    }
  }

  append<Type>(list: List<Type>): List<TElement> {
    let current = list.first;
    while (current) {
      this.push(current.value as TElement);
      current = current.next;
    }
    return this;
  }

  concat<Type>(list: List<Type>): List<TElement> {
    let current = list.first;
    while (current) {
      this.push(current.value as TElement);
      current = current.next;
    }
    return this;
  }

  filter<Type>(filterFn: (item: Type) => boolean): List<Type> {
    const filteredList = new List<Type>();
    let current = this.first;

    while (current) {
      if (filterFn(current.value as Type)) {
        filteredList.push(current.value as Type);
      }
      current = current.next;
    }

    return filteredList;
  }

  length(): number {
    return this._length;
  }

  map<Type>(mapFn: (item: Type) => Type): List<Type> {
    const mappedList = new List<Type>();
    let current = this.first;

    while (current) {
      mappedList.push(mapFn(current.value as Type));
      current = current.next;
    }

    return mappedList;
  }

  foldl<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    let foldResult: AccType = initialValue;
    let current = this.first;

    while (current) {
      foldResult = foldFn(foldResult, current.value as ElType);
      current = current.next;
    }

    return foldResult;
  }

  foldr<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    const reversedList = this.reverse();
    return reversedList.foldl<ElType, AccType>(foldFn, initialValue);
  }

  reverse(): List<TElement> {
    const reversedList = new List<TElement>();
    let current = this.first;

    while (current) {
      reversedList.unshift(current.value);
      current = current.next;
    }

    return reversedList;
  }
}