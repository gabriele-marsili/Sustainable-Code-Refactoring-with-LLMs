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
    if (!this.head) {
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
    if (!this.tail) return false;
    const popped = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.length--;
    return popped.value;
  }

  shift() {
    if (!this.head) return false;
    const shiftedNode = this.head;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.length--;
    return shiftedNode.value;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const removedNode = this.getNodeAtIndex(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    this.length--;
    return removedNode.value;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) return false;
    let currentNode = index < this.length / 2 ? this.head : this.tail;
    let currentIndex = index < this.length / 2 ? 0 : this.length - 1;
    const step = index < this.length / 2 ? 1 : -1;
    while (currentIndex !== index) {
      currentNode = step === 1 ? currentNode.next : currentNode.prev;
      currentIndex += step;
    }
    return currentNode;
  }

  delete(val) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === val) {
        if (currentNode === this.head) this.shift();
        else if (currentNode === this.tail) this.pop();
        else {
          currentNode.prev.next = currentNode.next;
          currentNode.next.prev = currentNode.prev;
          this.length--;
        }
        return;
      }
      currentNode = currentNode.next;
    }
  }

  count() {
    return this.length;
  }

  printList() {
    if (!this.head) {
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