//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {ListNode<T> | null} */
    this.head = null;
    /** @type {ListNode<T> | null} */
    this.tail = null;
    /** @type {number} */
    this.size = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    const node = new ListNode(element);
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }
    this.size++;
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
    this.size--;
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
    this.size--;
    return value;
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    const node = new ListNode(element);
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = this.tail = node;
    }
    this.size++;
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
        
        this.size--;
        break;
      }
      current = current.next;
    }
  }

  /**
   * @returns {number}
   */
  count() {
    return this.size;
  }
}

/**
 * @template T
 */
class ListNode {
  /**
   * @param {T} value
   */
  constructor(value) {
    /** @type {T} */
    this.value = value;
    /** @type {ListNode<T> | null} */
    this.next = null;
    /** @type {ListNode<T> | null} */
    this.prev = null;
  }
}