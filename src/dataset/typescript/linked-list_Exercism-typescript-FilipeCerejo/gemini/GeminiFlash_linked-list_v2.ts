class Node<T> {
  value: T;
  previous: Node<T> | undefined;
  next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.previous = undefined;
    this.next = undefined;
  }
}

export class LinkedList<T> {
  private first: Node<T> | undefined;
  private last: Node<T> | undefined;
  private _size: number;

  constructor() {
    this.first = undefined;
    this.last = undefined;
    this._size = 0;
  }

  public push(value: T): void {
    const newNode = new Node<T>(value);
    if (this.last) {
      this.last.next = newNode;
      newNode.previous = this.last;
      this.last = newNode;
    } else {
      this.first = newNode;
      this.last = newNode;
    }
    this._size++;
  }

  public pop(): T | undefined {
    if (!this.last) return undefined;

    const returnValue = this.last.value;
    this.last = this.last.previous;

    if (this.last) {
      this.last.next = undefined;
    } else {
      this.first = undefined;
    }
    this._size--;
    return returnValue;
  }

  public shift(): T | undefined {
    if (!this.first) return undefined;

    const returnValue = this.first.value;
    this.first = this.first.next;

    if (this.first) {
      this.first.previous = undefined;
    } else {
      this.last = undefined;
    }
    this._size--;
    return returnValue;
  }

  public unshift(value: T): void {
    const newNode = new Node<T>(value);
    if (this.first) {
      this.first.previous = newNode;
      newNode.next = this.first;
      this.first = newNode;
    } else {
      this.first = newNode;
      this.last = newNode;
    }
    this._size++;
  }

  public delete(value: T): void {
    let pointer = this.first;
    while (pointer) {
      if (pointer.value === value) {
        break;
      }
      pointer = pointer.next;
    }

    if (pointer) {
      if (pointer.previous) {
        pointer.previous.next = pointer.next;
      } else {
        this.first = pointer.next;
      }

      if (pointer.next) {
        pointer.next.previous = pointer.previous;
      } else {
        this.last = pointer.previous;
      }

      this._size--;
    }
  }

  public count(): number {
    return this._size;
  }
}