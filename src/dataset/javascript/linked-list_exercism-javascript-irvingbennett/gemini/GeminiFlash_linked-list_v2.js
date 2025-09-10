//DOUBLY LINKED
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
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) {
      return false;
    }

    const poppedNode = this.tail;
    const newTail = this.tail.prev;

    if (newTail) {
      newTail.next = null;
      this.tail = newTail;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return poppedNode.value;
  }

  shift() {
    if (!this.head) {
      return false;
    }

    const shiftedNode = this.head;
    const newHead = this.head.next;

    if (newHead) {
      newHead.prev = null;
      this.head = newHead;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return shiftedNode.value;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return false;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const removedNode = this.getNodeAtIndex(index);
    if (!removedNode) return false;

    const before = removedNode.prev;
    const after = removedNode.next;

    before.next = after;
    after.prev = before;

    this.length--;
    return removedNode.value;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return false;
    }

    let currentNode;
    let currentIndex;

    if (index < this.length / 2) {
      currentNode = this.head;
      currentIndex = 0;
      while (currentIndex !== index) {
        currentNode = currentNode.next;
        currentIndex++;
      }
    } else {
      currentNode = this.tail;
      currentIndex = this.length - 1;
      while (currentIndex !== index) {
        currentNode = currentNode.prev;
        currentIndex--;
      }
    }

    return currentNode;
  }

  delete(val) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === val) {
        this.removeAtIndex(index);
        return;
      }
      currentNode = currentNode.next;
      index++;
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
    let output = [];
    while (current) {
      output.push(current.value);
      current = current.next;
    }
    console.log(output.join(" -> "));
  }
}