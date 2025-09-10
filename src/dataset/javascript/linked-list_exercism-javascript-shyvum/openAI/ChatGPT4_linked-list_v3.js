export class LinkedList {
  constructor() {
    this.head = { next: null };
    this.tail = { prev: this.head };
    this.head.next = this.tail;
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
    const node = this.find(data);
    if (node) this.del(node);
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
    return null;
  }
  insert(data, prev) {
    const next = prev.next;
    const newNode = { data, prev, next };
    prev.next = next.prev = newNode;
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
    return this.size > 0 ? this.head.next : null;
  }
  lastNode() {
    return this.size > 0 ? this.tail.prev : null;
  }
}