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
  private size: number;

  constructor() {
    this.first = undefined;
    this.last = undefined;
    this.size = 0;
  }

  public push(value: T): void {
    const newNode = new Node<T>(value);
    if (this.last) {
      newNode.previous = this.last;
      this.last.next = newNode;
      this.last = newNode;
    } else {
      this.first = newNode;
      this.last = newNode;
    }
    this.size++;
  }

  public pop(): T | undefined {
    if (!this.last) return undefined;

    const returnValue = this.last.value;

    if (this.last.previous) {
      this.last = this.last.previous;
      this.last.next = undefined;
    } else {
      this.first = undefined;
      this.last = undefined;
    }

    this.size = Math.max(0, this.size - 1);
    return returnValue;
  }

  public shift(): T | undefined {
    if (!this.first) return undefined;

    const returnValue = this.first.value;

    if (this.first.next) {
      this.first = this.first.next;
      this.first.previous = undefined;
    } else {
      this.last = undefined;
      this.first = undefined;
    }

    this.size = Math.max(0, this.size - 1);
    return returnValue;
  }

  public unshift(value: T): void {
    const newNode = new Node<T>(value);
    if (this.first) {
      newNode.next = this.first;
      this.first.previous = newNode;
      this.first = newNode;
    } else {
      this.first = newNode;
      this.last = newNode;
    }
    this.size++;
  }

  public delete(value: T): void {
    let current = this.first;

    while (current) {
      if (current.value === value) {
        if (current.previous) {
          current.previous.next = current.next;
        } else {
          this.first = current.next;
        }

        if (current.next) {
          current.next.previous = current.previous;
        } else {
          this.last = current.previous;
        }

        this.size = Math.max(0, this.size - 1);
        return;
      }
      current = current.next;
    }
  }

  public count(): number {
    return this.size;
  }
}