//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {{ value: T, next: LinkedListNode<T> | null } | null} */
    this.head = null;
    /** @type {{ value: T, next: LinkedListNode<T> | null } | null} */
    this.tail = null;
    /** @type {number} */
    this.size = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    const newNode = { value: element, next: null };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    if (!this.head) {
      return undefined;
    }

    let poppedValue;
    if (this.head === this.tail) {
      poppedValue = this.head.value;
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current && current.next !== this.tail) {
        current = current.next;
      }
      if (current) {
        poppedValue = this.tail ? this.tail.value : undefined;
        current.next = null;
        this.tail = current;
      } else {
        return undefined;
      }
    }

    this.size--;
    return poppedValue;
  }

  /**
   * @returns {T | undefined}
   */
  shift() {
    if (!this.head) {
      return undefined;
    }

    const shiftedValue = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return shiftedValue;
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    const newNode = { value: element, next: this.head };
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
  }

  /**
   * @param {T} value
   */
  delete(value) {
    if (!this.head) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.size--;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }
        this.size--;
        return;
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