export class Element {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  constructor(values = []) {
    this.head = null;
    if (values && values.length > 0) {
      for (let i = values.length - 1; i >= 0; i--) {
        this.add(new Element(values[i]));
      }
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current;
      current = current.next;
    }
  }

  add(element) {
    element.next = this.head;
    this.head = element;
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
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}