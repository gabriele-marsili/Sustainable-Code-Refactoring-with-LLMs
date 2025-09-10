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
    if (!this.tail) {
      return false;
    }

    const poppedValue = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this.length--;
    return poppedValue;
  }

  shift() {
    if (!this.head) {
      return false;
    }

    const shiftedValue = this.head.value;
    this.head = this.head.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.length--;
    return shiftedValue;
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
    if (this.head) {
      let current = this.head;
      let output = "";
      while (current) {
        output += current.value + " ";
        current = current.next;
      }
      console.log(output.trim());
    } else {
      console.log("empty list");
    }
  }
}