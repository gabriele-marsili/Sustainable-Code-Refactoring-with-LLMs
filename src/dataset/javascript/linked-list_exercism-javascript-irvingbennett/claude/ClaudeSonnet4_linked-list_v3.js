export class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return false;
    
    const popped = this.tail;
    
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = popped.prev;
      this.tail.next = null;
      popped.prev = null;
    }
    
    this.length--;
    return popped.value;
  }

  shift() {
    if (this.length === 0) return false;
    
    const shifted = this.head;
    
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = shifted.next;
      this.head.prev = null;
      shifted.next = null;
    }
    
    this.length--;
    return shifted.value;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.length) return false;
    
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    
    const node = this.getNodeAtIndex(index);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = node.next = null;
    this.length--;
    return node.value;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) return false;
    
    let current;
    if (index < this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current;
  }

  delete(val) {
    let current = this.head;
    let index = 0;
    
    while (current && current.value !== val) {
      current = current.next;
      index++;
    }
    
    if (current) {
      this.removeAtIndex(index);
    }
  }

  count() {
    return this.length;
  }

  printList() {
    if (this.length === 0) {
      console.log("empty list");
      return;
    }
    
    let current = this.head;
    while (current) {
      console.log(current);
      current = current.next;
    }
  }
}