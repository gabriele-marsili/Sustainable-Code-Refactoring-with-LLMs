export class LinkedList {
  constructor() {
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this._size = 0;
  }
  
  push(data) {
    this.insert(data, this.tail.prev);
  }
  
  unshift(data) {
    this.insert(data, this.head);
  }
  
  pop() {
    return this.tail.prev === this.head ? undefined : this.del(this.tail.prev);
  }
  
  shift() {
    return this.head.next === this.tail ? undefined : this.del(this.head.next);
  }
  
  delete(data) {
    let node = this.head.next;
    while (node !== this.tail) {
      if (node.data === data) {
        this.del(node);
        return;
      }
      node = node.next;
    }
  }
  
  count() {
    return this._size;
  }
  
  find(data) {
    let node = this.head.next;
    while (node !== this.tail) {
      if (node.data === data) return node;
      node = node.next;
    }
    return undefined;
  }
  
  insert(data, prev) {
    const next = prev.next;
    const newNode = { data, prev, next };
    prev.next = newNode;
    next.prev = newNode;
    this._size++;
  }
  
  del(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this._size--;
    return node.data;
  }
  
  *nodes() {
    let node = this.head.next;
    while (node !== this.tail) {
      yield node;
      node = node.next;
    }
  }
  
  firstNode() {
    return this.head.next;
  }
  
  lastNode() {
    return this.tail.prev;
  }
}