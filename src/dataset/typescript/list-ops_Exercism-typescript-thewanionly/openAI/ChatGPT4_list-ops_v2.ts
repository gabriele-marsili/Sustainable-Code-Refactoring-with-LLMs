type ItemType<T> = Item<T> | null;

class Item<T> {
  value: T;
  next: ItemType<T>;
  prev: ItemType<T>;

  constructor(value: T, next: ItemType<T> = null, prev: ItemType<T> = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export class List<TElement> {
  first: ItemType<TElement> = null;
  last: ItemType<TElement> = null;

  public static create<Type>(...values: Type[]): List<Type> {
    const list = new List<Type>();
    for (const value of values) {
      list.push(value);
    }
    return list;
  }

  push(value: TElement): void {
    const item = new Item<TElement>(value);
    if (this.last) {
      this.last.next = item;
      item.prev = this.last;
    } else {
      this.first = item;
    }
    this.last = item;
  }

  unshift(value: TElement): void {
    const item = new Item<TElement>(value);
    if (this.first) {
      this.first.prev = item;
      item.next = this.first;
    } else {
      this.last = item;
    }
    this.first = item;
  }

  forEach(callbackFn: (value: TElement) => void): void {
    for (let currItem = this.first; currItem; currItem = currItem.next) {
      callbackFn(currItem.value);
    }
  }

  append<Type>(list: List<Type>): List<TElement> {
    for (let currItem = list.first; currItem; currItem = currItem.next) {
      this.push(currItem.value as TElement);
    }
    return this;
  }

  concat<Type>(list: List<Type>): List<TElement> {
    return this.append(list);
  }

  filter<Type>(filterFn: (item: Type) => boolean): List<Type> {
    const filteredList = new List<Type>();
    for (let currItem = this.first; currItem; currItem = currItem.next) {
      if (filterFn(currItem.value as Type)) {
        filteredList.push(currItem.value as Type);
      }
    }
    return filteredList;
  }

  length(): number {
    let count = 0;
    for (let currItem = this.first; currItem; currItem = currItem.next) {
      count++;
    }
    return count;
  }

  map<Type>(mapFn: (item: TElement) => Type): List<Type> {
    const mappedList = new List<Type>();
    for (let currItem = this.first; currItem; currItem = currItem.next) {
      mappedList.push(mapFn(currItem.value));
    }
    return mappedList;
  }

  foldl<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    let foldResult = initialValue;
    for (let currItem = this.first; currItem; currItem = currItem.next) {
      foldResult = foldFn(foldResult, currItem.value as ElType);
    }
    return foldResult;
  }

  foldr<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    let foldResult = initialValue;
    for (let currItem = this.last; currItem; currItem = currItem.prev) {
      foldResult = foldFn(foldResult, currItem.value as ElType);
    }
    return foldResult;
  }

  reverse(): List<TElement> {
    const reversedList = new List<TElement>();
    for (let currItem = this.last; currItem; currItem = currItem.prev) {
      reversedList.push(currItem.value);
    }
    return reversedList;
  }
}