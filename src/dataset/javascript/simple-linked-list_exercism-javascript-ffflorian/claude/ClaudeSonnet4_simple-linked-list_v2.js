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
    if (this.head === null) {
      this.head = element;
    } else {
      element.next = this.head;
      this.head = element;
    }
    this._length++;
  }

  reverse() {
    const values = [];
    let pointer = this.head;
    while (pointer) {
      values.push(pointer.value);
      pointer = pointer.next;
    }
    return new List(values);
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