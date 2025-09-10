//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {Map<number, T>} */
    this.elements = new Map();
    this.head = 0;
    this.tail = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    this.elements.set(this.tail++, element);
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    if (this.tail === this.head) return undefined;
    const element = this.elements.get(--this.tail);
    this.elements.delete(this.tail);
    return element;
  }

  /**
   * @returns {T | undefined}
   */
  shift() {
    if (this.tail === this.head) return undefined;
    const element = this.elements.get(this.head);
    this.elements.delete(this.head++);
    return element;
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    this.elements.set(--this.head, element);
  }

  /**
   * @param {T} value
   */
  delete(value) {
    for (const [key, element] of this.elements) {
      if (element === value) {
        this.elements.delete(key);
        break;
      }
    }
  }

  /**
   * @returns {number}
   */
  count() {
    return this.tail - this.head;
  }
}