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
    const newTail = poppedNode.prev;

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
    const newHead = shiftedNode.next;

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

    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;

    this.length--;
    return removedNode.value;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return false;
    }

    let current;
    let currentIndex;

    if (index < this.length / 2) {
      current = this.head;
      currentIndex = 0;
      while (currentIndex !== index) {
        current = current.next;
        currentIndex++;
      }
    } else {
      current = this.tail;
      currentIndex = this.length - 1;
      while (currentIndex !== index) {
        current = current.prev;
        currentIndex--;
      }
    }

    return current;
  }

  delete(val) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === val) {
        this.removeAtIndex(index);
        return;
      }
      current = current.next;
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
    console.log(output.join(" <-> "));
  }
}