export class Element {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  constructor(values = []) {
    this.head = null;
    if (values.length > 0) {
      this.head = new Element(values[0]);
      let current = this.head;
      for (let i = 1; i < values.length; i++) {
        current.next = new Element(values[i]);
        current = current.next;
      }
    }
  }

  *[Symbol.iterator]() {
    let pointer = this.head;
    while (pointer) {
      yield pointer.value;
      pointer = pointer.next;
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
    for (const value of this) {
      result.push(value);
    }
    return result;
  }

  get length() {
    let count = 0;
    for (let _ of this) {
      count++;
    }
    return count;
  }
}