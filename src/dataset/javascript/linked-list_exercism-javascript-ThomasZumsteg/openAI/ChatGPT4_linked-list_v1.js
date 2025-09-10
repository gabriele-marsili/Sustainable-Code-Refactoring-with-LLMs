class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newElement = new Element(val, null, this.tail);
    if (this.tail) {
      this.tail.next = newElement;
    } else {
      this.head = newElement;
    }
    this.tail = newElement;
    this.length++;
  }

  pop() {
    if (!this.tail) return undefined;
    const value = this.tail.val;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return value;
  }

  unshift(val) {
    const newElement = new Element(val, this.head, null);
    if (this.head) {
      this.head.prev = newElement;
    } else {
      this.tail = newElement;
    }
    this.head = newElement;
    this.length++;
  }

  shift() {
    if (!this.head) return undefined;
    const value = this.head.val;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  count() {
    return this.length;
  }

  delete(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.length--;
        return;
      }
      current = current.next;
    }
  }
}

class Element {
  constructor(val, next, prev) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

export default LinkedList;