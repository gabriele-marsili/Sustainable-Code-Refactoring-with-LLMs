class Node<T> {
  private _value: T;
  private _previous: Node<T> | undefined;
  private _next: Node<T> | undefined;

  constructor(v: T) {
    this._value = v;
    this._previous = undefined;
    this._next = undefined;
  }

  public setPrevious(p: Node<T> | undefined) {
    this._previous = p;
  }
  public getPrevious() {
    return this._previous;
  }

  public setNext(n: Node<T> | undefined) {
    this._next = n;
  }
  public getNext() {
    return this._next;
  }

  public getValue() {
    return this._value;
  }
}

export class LinkedList<T> {
  private _first: Node<T> | undefined;
  private _last: Node<T> | undefined;

  constructor() {
    this._first = undefined;
    this._last = undefined;
  }

  public push(value: T): void {
    const newNode = new Node<T>(value);
    if (this._last) {
      this._last.setNext(newNode);
      newNode.setPrevious(this._last);
    } else {
      this._first = newNode;
    }
    this._last = newNode;
  }

  public pop(): T | undefined {
    if (!this._last) return undefined;

    let returnValue = this._last;

    if (this._last.getPrevious()) {
      let prevNode = this._last.getPrevious();
      prevNode!.setNext(undefined);
      this._last.setPrevious(undefined);
      this._last = prevNode;
    } else {
      this._first = undefined;
      this._last = undefined;
    }

    return returnValue.getValue();
  }

  public shift(): T | undefined {
    if (!this._first) return undefined;

    let returnValue = this._first;

    if (this._first.getNext()) {
      let nextNode = this._first.getNext();
      nextNode!.setPrevious(undefined);
      this._first.setNext(undefined);
      this._first = nextNode;
    } else {
      this._last = undefined;
      this._first = undefined;
    }

    return returnValue.getValue();
  }

  public unshift(value: T): void {
    const newNode = new Node<T>(value);
    if (this._first) {
      this._first.setPrevious(newNode);
      newNode.setNext(this._first);
    } else {
      this._last = newNode;
    }
    this._first = newNode;
  }

  public delete(value: T): void {
    let pointer = this._first;
    while (pointer) {
      if (pointer.getValue() === value) break;
      pointer = pointer.getNext();
    }
    //If there is a value
    if (pointer) {
      if(!pointer.getNext() && !pointer.getPrevious()) {
        this._first = undefined;
        this._last = undefined;
      } else {
        if(pointer.getNext()) {
        pointer.getNext()!.setPrevious(pointer.getPrevious());
      }
      if(pointer.getPrevious()) {
        pointer.getPrevious()!.setNext(pointer.getNext()); 
      }
      }
      
    }
  }

  public count(): number {
    let count = 0;
    let pointer = this._first;
    while (pointer) {
      count++;
      pointer = pointer.getNext();
    }
    return count;
  }
}
