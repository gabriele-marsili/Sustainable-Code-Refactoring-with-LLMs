export class LinkedList {
  constructor() {
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  push(data) {
    this.insert(data, this.tail.prev);
  }
  unshift(data) {
    this.insert(data, this.head);
  }
  pop() {
    return this.size > 0 ? this.del(this.tail.prev) : undefined;
  }
  shift() {
    return this.size > 0 ? this.del(this.head.next) : undefined;
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
    return this.size;
  }
  find(data) {
    let node = this.head.next;
    while (node !== this.tail) {
      if (node.data === data) return node;
      node = node.next;
    }
  }
  insert(data, prev) {
    const next = prev.next;
    const newNode = { data, prev, next };
    prev.next = newNode;
    next.prev = newNode;
    this.size++;
  }
  del(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
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