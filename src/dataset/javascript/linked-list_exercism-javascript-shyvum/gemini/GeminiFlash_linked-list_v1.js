export class LinkedList {
  constructor() {
    this.head = { next: null };
    this.tail = { prev: null };
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
    if (this.size === 0) return undefined;
    return this.del(this.tail.prev);
  }

  shift() {
    if (this.size === 0) return undefined;
    return this.del(this.head.next);
  }

  delete(data) {
    let current = this.head.next;
    while (current !== this.tail) {
      if (current.data === data) {
        this.del(current);
        return;
      }
      current = current.next;
    }
  }

  count() {
    return this.size;
  }

  find(data) {
    let current = this.head.next;
    while (current !== this.tail) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  insert(data, prev) {
    const newNode = { data, prev, next: prev.next };
    prev.next.prev = newNode;
    prev.next = newNode;
    this.size++;
  }

  del(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
    return node.data;
  }
}