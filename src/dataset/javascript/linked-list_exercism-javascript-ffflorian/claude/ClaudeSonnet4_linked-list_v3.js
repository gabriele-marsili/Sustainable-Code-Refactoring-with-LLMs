//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {Node<T> | null} */
    this.head = null;
    /** @type {Node<T> | null} */
    this.tail = null;
    /** @type {number} */
    this._count = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    const node = new Node(element);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this._count++;
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    if (!this.tail) return undefined;
    
    const value = this.tail.value;
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = this.tail = null;
    }
    this._count--;
    return value;
  }

  /**
   * @returns {T | undefined}
   */
  shift() {
    if (!this.head) return undefined;
    
    const value = this.head.value;
    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = this.tail = null;
    }
    this._count--;
    return value;
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    const node = new Node(element);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this._count++;
  }

  /**
   * @param {T} value
   */
  delete(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        
        this._count--;
        break;
      }
      current = current.next;
    }
  }

  /**
   * @returns {number}
   */
  count() {
    return this._count;
  }
}

/**
 * @template T
 */
class Node {
  /**
   * @param {T} value
   */
  constructor(value) {
    /** @type {T} */
    this.value = value;
    /** @type {Node<T> | null} */
    this.next = null;
    /** @type {Node<T> | null} */
    this.prev = null;
  }
}