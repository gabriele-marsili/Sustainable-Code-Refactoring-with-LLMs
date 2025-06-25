class ListNode {
  private _value: number;
  private _next: ListNode | undefined;

  public get value() {
    return this._value;
  }

  public get next() {
    return this._next;
  }

  public set next(n: ListNode | undefined) {
    this._next = n;
  }

  constructor(v: number) {
    this._value = v;
    this._next = undefined;
  }
}

export class List {
  private _first: ListNode | undefined = undefined;

  private get lastNode(): ListNode | undefined {
    let current: ListNode | undefined = this._first;
    while (current && current.next) {
      current = current.next;
    }
    return current;
  }

  public static create(...values: number[] | List[]): List {
    if (!values.length || !(values[0] instanceof List)) {
      return new List(values as number[]);
    } else {
      let list = values[0] as List;
      for (let i = 1; i < values.length; i++) {
        list.concat(values[i] as List);
      }
      console.log(list)
      return list;
    }
  }

  constructor(values: number[]) {
    let previous: ListNode;
    for (let v = 0; v < values.length; v++) {
      if (!this._first) {
        this._first = new ListNode(values[v]);

        previous = this._first;
      } else {
        let newValue = new ListNode(values[v]);

        previous!.next = newValue;
        previous = newValue;
      }
    }
  }

  forEach(fn: (item: number) => void) {
    let current: ListNode | undefined = this._first;
    while (current) {
      fn(current.value);
      current = current.next;
    }
  }

  append(list: List) {
    let lastNode = this.lastNode;
    let newListCurrent = list._first;
    while (newListCurrent) {
      if (!lastNode) {
        this._first = newListCurrent;
        lastNode = this._first;
      } else {
        lastNode.next = newListCurrent;
        lastNode = newListCurrent;
      }

      newListCurrent = newListCurrent.next;
    }
    return this;
  }

  length(): number {
    let current: ListNode | undefined = this._first;
    let count = current ? 1 : 0;
    while (current && current.next) {
      count++;
      current = current.next;
    }
    return count;
  }

  filter<T>(fn: (item: number) => boolean): List {
    let current: ListNode | undefined = this._first;
    let newList: List = List.create();
    while (current) {
      if (fn(current.value)) {
        newList.addValue(current.value);
      }

      current = current.next;
    }
    return newList;
  }

  private addValue(value: number) {
    if (!this._first) {
      this._first = new ListNode(value);
    } else {
      this.lastNode!.next = new ListNode(value);
    }
  }

  map<U>(fn: (item: number) => number): List {
    let current: ListNode | undefined = this._first;
    let newList = List.create();
    while (current) {
      newList.addValue(fn(current.value));
      current = current.next;
    }
    return newList;
  }

  foldl<T, U>(fn: (acc: T, el: number) => T, initial: T) {
    let current: ListNode | undefined = this._first;
    while (current) {
      initial = fn(initial, current.value);
      current = current.next;
    }
    return initial;
  }

  foldr<T, U>(fn: (acc: T, el: number) => T, initial: T) {
    let revList = this.reverse();
    let result = revList?.foldl(fn, initial);
    this.reverse();
    return result;
  }
  
  reverse(): List | undefined {
    if (!this._first) return this;

    let previous: ListNode | undefined = undefined;
    let current: ListNode | undefined = this._first;
    while (current) {
      let next: ListNode | undefined = current.next;
      current.next = previous;

      previous = current;
      current = next;
    }

    this._first = previous;
    return this;
  }

  concat(anotherList: List): List {
    if (!this._first || !anotherList._first) return anotherList;

    anotherList.forEach((i) => {
      let current: ListNode | undefined = this._first;
      let hasValue = false;
      while (current) {
        if (current.value === i) {
          hasValue = true;
        }
        current = current.next;
      }
      if (!hasValue) {
        this.addValue(i);
      }
    });

    return this;
  }
  
  log(): void {
    let current: ListNode | undefined = this._first;
    let i = 0;
    while (current) {
      console.warn(`${i}: ${current.value}`);

      current = current.next;
      i++;
    }
  }
}
