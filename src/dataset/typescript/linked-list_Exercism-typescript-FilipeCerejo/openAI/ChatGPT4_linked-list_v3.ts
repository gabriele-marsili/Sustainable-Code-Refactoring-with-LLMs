class Node<T> {
  constructor(
    private _value: T,
    private _previous?: Node<T>,
    private _next?: Node<T>
  ) {}

  public setPrevious(p: Node<T> | undefined): void {
    this._previous = p;
  }
  public getPrevious(): Node<T> | undefined {
    return this._previous;
  }

  public setNext(n: Node<T> | undefined): void {
    this._next = n;
  }
  public getNext(): Node<T> | undefined {
    return this._next;
  }

  public getValue(): T {
    return this._value;
  }
}

export class LinkedList<T> {
  private _first?: Node<T>;
  private _last?: Node<T>;
  private _size: number = 0;

  public push(value: T): void {
    const newNode = new Node(value, this._last);
    if (this._last) {
      this._last.setNext(newNode);
    } else {
      this._first = newNode;
    }
    this._last = newNode;
    this._size++;
  }

  public pop(): T | undefined {
    if (!this._last) return undefined;

    const returnValue = this._last.getValue();
    this._last = this._last.getPrevious();

    if (this._last) {
      this._last.setNext(undefined);
    } else {
      this._first = undefined;
    }

    this._size--;
    return returnValue;
  }

  public shift(): T | undefined {
    if (!this._first) return undefined;

    const returnValue = this._first.getValue();
    this._first = this._first.getNext();

    if (this._first) {
      this._first.setPrevious(undefined);
    } else {
      this._last = undefined;
    }

    this._size--;
    return returnValue;
  }

  public unshift(value: T): void {
    const newNode = new Node(value, undefined, this._first);
    if (this._first) {
      this._first.setPrevious(newNode);
    } else {
      this._last = newNode;
    }
    this._first = newNode;
    this._size++;
  }

  public delete(value: T): void {
    let pointer = this._first;
    while (pointer) {
      if (pointer.getValue() === value) {
        const prev = pointer.getPrevious();
        const next = pointer.getNext();

        if (prev) prev.setNext(next);
        if (next) next.setPrevious(prev);

        if (pointer === this._first) this._first = next;
        if (pointer === this._last) this._last = prev;

        this._size--;
        return;
      }
      pointer = pointer.getNext();
    }
  }

  public count(): number {
    return this._size;
  }
}