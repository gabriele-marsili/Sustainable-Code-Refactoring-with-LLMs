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
    const reversed = new List();
    let current = this.head;
    
    while (current) {
      const newElement = new Element(current.value);
      if (reversed.head === null) {
        reversed.head = newElement;
      } else {
        let tail = reversed.head;
        while (tail.next) {
          tail = tail.next;
        }
        tail.next = newElement;
      }
      reversed._length++;
      current = current.next;
    }
    
    return reversed;
  }

  toArray() {
    const result = new Array(this._length);
    let pointer = this.head;
    let index = 0;
    
    while (pointer) {
      result[index++] = pointer.value;
      pointer = pointer.next;
    }
    
    return result;
  }

  get length() {
    return this._length;
  }
}