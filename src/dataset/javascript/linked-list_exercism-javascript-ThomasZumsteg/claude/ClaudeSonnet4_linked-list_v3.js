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
    if (this.length === 0) return undefined;
    
    const element = this.tail;
    this.tail = element.prev;
    
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    
    this.length--;
    const val = element.val;
    element.val = null;
    element.prev = null;
    return val;
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
    if (this.length === 0) return undefined;
    
    const element = this.head;
    this.head = element.next;
    
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    
    this.length--;
    const val = element.val;
    element.val = null;
    element.next = null;
    return val;
  }

  count() {
    return this.length;
  }

  delete(val) {
    let element = this.head;
    
    while (element && element.val !== val) {
      element = element.next;
    }
    
    if (!element) return;
    
    if (element.prev) {
      element.prev.next = element.next;
    } else {
      this.head = element.next;
    }
    
    if (element.next) {
      element.next.prev = element.prev;
    } else {
      this.tail = element.prev;
    }
    
    element.val = null;
    element.next = null;
    element.prev = null;
    this.length--;
  }
}

class Element {
  constructor(val, next, prev) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }

  delete() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    this.val = null;
    this.next = null;
    this.prev = null;
  }
}

export default LinkedList;