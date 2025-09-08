export class Element {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  constructor(values = []) {
    this.head = null;
    for (let i = values.length - 1; i >= 0; i--) {
      this.add(new Element(values[i]));
    }
  }

  *[Symbol.iterator]() {
    for (let pointer = this.head; pointer; pointer = pointer.next) {
      yield pointer;
    }
  }

  add(element) {
    element.next = this.head;
    this.head = element;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    return this;
  }

  toArray() {
    const result = [];
    for (let pointer = this.head; pointer; pointer = pointer.next) {
      result.push(pointer.value);
    }
    return result;
  }

  get length() {
    let count = 0;
    for (let pointer = this.head; pointer; pointer = pointer.next) {
      count++;
    }
    return count;
  }
}