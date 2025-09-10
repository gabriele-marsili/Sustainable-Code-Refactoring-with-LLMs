//@ts-check

/**
 * @template T
 */
export class LinkedList {
  constructor() {
    /** @type {T[]} */
    this.elements = [];
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * @param {T} element
   */
  push(element) {
    this.elements.push(element);
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    return this.elements.pop();
  }

  /**
   * @returns {T | undefined}
   */
  shift() {
    return this.elements.shift();
  }

  /**
   * @param {T} element
   */
  unshift(element) {
    this.elements.unshift(element);
  }


  /**
   * @param {T} value
   */
  delete(value) {
    const index = this.elements.indexOf(value);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }

  /**
   * @returns {number}
   */
  count() {
    return this.elements.length;
  }
}