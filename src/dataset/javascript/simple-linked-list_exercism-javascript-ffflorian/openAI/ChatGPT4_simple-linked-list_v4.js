export class Element {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  constructor(values = []) {
    this.head = null;
    this._length = 0;
    for (let i = values.length - 1; i >= 0; i--) {
      this.add(new Element(values[i]));
    }
  }

  *[Symbol.iterator]() {
    let pointer = this.head;
    while (pointer) {
      yield pointer;
      pointer = pointer.next;
    }
  }

  add(element) {
    element.next = this.head;
    this.head = element;
    this._length++;
  }

  reverse() {
    let reversedHead = null;
    let pointer = this.head;
    while (pointer) {
      const next = pointer.next;
      pointer.next = reversedHead;
      reversedHead = pointer;
      pointer = next;
    }
    const reversedList = new List();
    reversedList.head = reversedHead;
    reversedList._length = this._length;
    return reversedList;
  }

  toArray() {
    const result = [];
    let pointer = this.head;
    while (pointer) {
      result.push(pointer.value);
      pointer = pointer.next;
    }
    return result;
  }

  get length() {
    return this._length;
  }
}