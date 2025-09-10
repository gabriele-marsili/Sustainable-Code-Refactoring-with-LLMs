export class LinkedList {
  constructor() {
    this.head = { next: null };
    this.tail = { prev: this.head };
    this.head.next = this.tail;
  }
  push(data) {
    this.insert(data, this.tail.prev);
  }
  unshift(data) {
    this.insert(data, this.head);
  }
  pop() {
    return this.tail.prev !== this.head ? this.del(this.tail.prev) : undefined;
  }
  shift() {
    return this.head.next !== this.tail ? this.del(this.head.next) : undefined;
  }
  delete(data) {
    const node = this.find(data);
    if (node) this.del(node);
  }
  count() {
    let count = 0;
    for (let node = this.head.next; node !== this.tail; node = node.next) {
      count++;
    }
    return count;
  }
  find(data) {
    for (let node = this.head.next; node !== this.tail; node = node.next) {
      if (node.data === data) return node;
    }
    return null;
  }
  insert(data, prev) {
    const next = prev.next;
    const newNode = { data, prev, next };
    prev.next = next.prev = newNode;
  }
  del(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    return node.data;
  }
  *nodes() {
    for (let node = this.head.next; node !== this.tail; node = node.next) {
      yield node;
    }
  }
  firstNode() {
    return this.head.next;
  }
  lastNode() {
    return this.tail.prev;
  }
}