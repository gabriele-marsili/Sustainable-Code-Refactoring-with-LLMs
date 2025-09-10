//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {T | null} */
    this.head = null;
    /** @type {T | null} */
    this.tail = null;
    this.size = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    const node = { value: element, next: null };
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    this.size++;
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    if (!this.head) return undefined;
    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this.size--;
      return value;
    }
    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }
    const value = this.tail.value;
    current.next = null;
    this.tail = current;
    this.size--;
    return value;
  }

  /**
   * @returns {T | undefined}
   */
  shift() {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return value;
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    const node = { value: element, next: this.head };
    this.head = node;
    if (!this.tail) this.tail = node;
    this.size++;
  }

  /**
   * @param {T} value
   */
  delete(value) {
    if (!this.head) return;
    while (this.head && this.head.value === value) {
      this.head = this.head.next;
      this.size--;
    }
    let current = this.head;
    while (current && current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
      } else {
        current = current.next;
      }
    }
    if (this.tail && this.tail.value === value) {
      this.tail = current;
    }
  }

  /**
   * @returns {number}
   */
  count() {
    return this.size;
  }
}