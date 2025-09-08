export class Element {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  constructor(values = []) {
    this.head = null;
    this.listLength = 0;
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
    this.listLength++;
  }

  reverse() {
    const reversedList = new List();
    let current = this.head;
    while (current) {
      reversedList.add(new Element(current.value));
      current = current.next;
    }
    return reversedList;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  get length() {
    return this.listLength;
  }
}