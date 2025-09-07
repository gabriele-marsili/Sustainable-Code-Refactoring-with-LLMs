type ItemType<T> = Item<T> | null

class Item<T> {
  value: T
  next: ItemType<T>
  prev: ItemType<T>

  constructor(value: T, next?: ItemType<T>, prev?: ItemType<T>) {
    this.value = value
    this.prev = prev || null
    this.next = next || null
  }
}

export class List<TElement> {
  first: ItemType<TElement> = null
  last: ItemType<TElement> = null
  private _length: number = 0

  public static create<Type>(...values: Type[]): List<Type> {
    const list = new List<Type>()
    
    for (let i = 0; i < values.length; i++) {
      list.push(values[i])
    }

    return list
  }

  push(value: TElement): void {
    const item = new Item<TElement>(value)

    if (this.last) {
      this.last.next = item
      item.prev = this.last
      this.last = item
    } else {
      this.last = this.first = item
    }
    this._length++
  }

  unshift(value: TElement): void {
    const item = new Item<TElement>(value)

    if (this.first) {
      this.first.prev = item
      item.next = this.first
      this.first = item
    } else {
      this.first = this.last = item
    }
    this._length++
  }

  forEach(callbackFn: (value: TElement) => void): void {
    let currItem = this.first

    while (currItem) {
      callbackFn(currItem.value)
      currItem = currItem.next
    }
  }

  append<Type>(list: List<Type>): List<TElement> {
    let currItem = list.first

    while (currItem) {
      this.push(currItem.value as TElement)
      currItem = currItem.next
    }

    return this
  }

  concat<Type>(list: List<Type>): List<TElement> {
    let currItem = list.first

    while (currItem) {
      const value = currItem.value
      if (value instanceof List) {
        this.concat(value as List<Type>)
      } else {
        this.push(value as TElement)
      }
      currItem = currItem.next
    }

    return this
  }

  filter<Type>(filterFn: (item: Type) => boolean): List<Type> {
    const filteredList = new List<Type>()
    let currItem = this.first

    while (currItem) {
      if (filterFn(currItem.value as Type)) {
        filteredList.push(currItem.value as Type)
      }
      currItem = currItem.next
    }

    return filteredList
  }

  length(): number {
    return this._length
  }

  map<Type>(mapFn: (item: Type) => Type): List<Type> {
    const mappedList = new List<Type>()
    let currItem = this.first

    while (currItem) {
      mappedList.push(mapFn(currItem.value as Type))
      currItem = currItem.next
    }

    return mappedList
  }

  foldl<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    let foldResult: AccType = initialValue
    let currItem = this.first

    while (currItem) {
      foldResult = foldFn(foldResult, currItem.value as ElType)
      currItem = currItem.next
    }

    return foldResult
  }

  foldr<ElType, AccType>(
    foldFn: (acc: AccType, item: ElType) => AccType,
    initialValue: AccType
  ): AccType {
    let foldResult: AccType = initialValue
    let currItem = this.last

    while (currItem) {
      foldResult = foldFn(foldResult, currItem.value as ElType)
      currItem = currItem.prev
    }

    return foldResult
  }

  reverse(): List<TElement> {
    const reversedList = new List<TElement>()
    let currItem = this.last

    while (currItem) {
      reversedList.push(currItem.value)
      currItem = currItem.prev
    }

    return reversedList
  }
}