export class LinkedList {
  constructor() {
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this._count = 0;
  }
  push(data) {
    this.insert(data, this.lastNode());
  }
  unshift(data) {
    this.insert(data, this.head);
  }
  pop() {
    return this.del(this.lastNode());
  }
  shift() {
    return this.del(this.firstNode());
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
    return this._count;
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
    this._count++;
  }
  del(node) {
    if (node === this.head || node === this.tail) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this._count--;
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