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
    return this.deleteNode(this.tail.prev);
  }

  shift() {
    if (this.size === 0) return undefined;
    return this.deleteNode(this.head.next);
  }

  delete(data) {
    let current = this.head.next;
    while (current !== this.tail) {
      if (current.data === data) {
        this.deleteNode(current);
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

  deleteNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
    return node.data;
  }

  *nodes() {
    let current = this.head.next;
    while (current !== this.tail) {
      yield current;
      current = current.next;
    }
  }
}