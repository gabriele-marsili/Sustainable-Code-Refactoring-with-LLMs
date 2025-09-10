export class LinkedList {
  constructor() {
    this.head = { next: null };
    this.tail = { prev: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0; // Track size for efficiency
  }
  push(data) {
    this.insert(data, this.tail.prev);
  }
  unshift(data) {
    this.insert(data, this.head);
  }
  pop() {
    if (this.size === 0) return undefined;
    return this.del(this.tail.prev);
  }
  shift() {
    if (this.size === 0) return undefined;
    return this.del(this.head.next);
  }
  delete(data) {
    const node = this.find(data);
    if (node) this.del(node);
  }
  count() {
    return this.size; // Use tracked size
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
    this.size++; // Increment size
  }
  del(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--; // Decrement size
    return node.data;
  }
  *nodes() {
    for (let node = this.head.next; node !== this.tail; node = node.next) {
      yield node;
    }
  }
  firstNode() {
    return this.size > 0 ? this.head.next : null;
  }
  lastNode() {
    return this.size > 0 ? this.tail.prev : null;
  }
}