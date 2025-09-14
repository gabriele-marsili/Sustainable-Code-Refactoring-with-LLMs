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
    if (this.length === 0) {
      return false;
    }
    
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
    if (this.length === 0) {
      return false;
    }
    
    const shiftedNode = this.head;
    
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    
    this.length--;
    return shiftedNode.value;
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
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = removedNode.prev = null;
    this.length--;
    
    return removedNode.value;
  }

  getNodeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return false;
    }
    
    let currentNode;
    
    if (index < this.length / 2) {
      currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        currentNode = currentNode.prev;
      }
    }
    
    return currentNode;
  }

  delete(val) {
    let currentNode = this.head;
    let currentIndex = 0;
    
    while (currentNode && currentNode.value !== val) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    
    if (currentNode && currentNode.value === val) {
      this.removeAtIndex(currentIndex);
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