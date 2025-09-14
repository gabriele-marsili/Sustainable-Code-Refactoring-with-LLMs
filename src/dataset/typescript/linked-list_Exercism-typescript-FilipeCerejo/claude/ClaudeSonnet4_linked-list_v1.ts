class Node<T> {
  public value: T;
  public previous: Node<T> | undefined;
  public next: Node<T> | undefined;

  constructor(v: T) {
    this.value = v;
    this.previous = undefined;
    this.next = undefined;
  }

  public setPrevious(p: Node<T> | undefined) {
    this.previous = p;
  }
  public getPrevious() {
    return this.previous;
  }

  public setNext(n: Node<T> | undefined) {
    this.next = n;
  }
  public getNext() {
    return this.next;
  }

  public getValue() {
    return this.value;
  }
}

export class LinkedList<T> {
  private _first: Node<T> | undefined;
  private _last: Node<T> | undefined;
  private _count: number;

  constructor() {
    this._first = undefined;
    this._last = undefined;
    this._count = 0;
  }

  public push(value: T): void {
    const newNode = new Node<T>(value);
    if (this._last) {
      this._last.next = newNode;
      newNode.previous = this._last;
    } else {
      this._first = newNode;
    }
    this._last = newNode;
    this._count++;
  }

  public pop(): T | undefined {
    if (!this._last) return undefined;

    const returnValue = this._last.value;
    const prevNode = this._last.previous;

    if (prevNode) {
      prevNode.next = undefined;
      this._last = prevNode;
    } else {
      this._first = undefined;
      this._last = undefined;
    }

    this._count--;
    return returnValue;
  }

  public shift(): T | undefined {
    if (!this._first) return undefined;

    const returnValue = this._first.value;
    const nextNode = this._first.next;

    if (nextNode) {
      nextNode.previous = undefined;
      this._first = nextNode;
    } else {
      this._first = undefined;
      this._last = undefined;
    }

    this._count--;
    return returnValue;
  }

  public unshift(value: T): void {
    const newNode = new Node<T>(value);
    if (this._first) {
      this._first.previous = newNode;
      newNode.next = this._first;
    } else {
      this._last = newNode;
    }
    this._first = newNode;
    this._count++;
  }

  public delete(value: T): void {
    let pointer = this._first;
    while (pointer) {
      if (pointer.value === value) {
        if (pointer.previous) {
          pointer.previous.next = pointer.next;
        } else {
          this._first = pointer.next;
        }
        
        if (pointer.next) {
          pointer.next.previous = pointer.previous;
        } else {
          this._last = pointer.previous;
        }
        
        this._count--;
        return;
      }
      pointer = pointer.next;
    }
  }

  public count(): number {
    return this._count;
  }
}