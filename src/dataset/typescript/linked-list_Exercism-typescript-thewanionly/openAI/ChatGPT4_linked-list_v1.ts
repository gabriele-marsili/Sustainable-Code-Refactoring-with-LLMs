type NodeType<T> = Node<T> | null;

class Node<T> {
  constructor(
    public value: T,
    public prev: NodeType<T> = null,
    public next: NodeType<T> = null
  ) {}
}

export class LinkedList<TElement> {
  private _size: number = 0;
  head: NodeType<TElement> = null;
  tail: NodeType<TElement> = null;

  public push(element: TElement): void {
    const newNode = new Node(element, this.tail);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this._size++;
  }

  public pop(): TElement | void {
    if (!this.tail) return;
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this._size--;
    return value;
  }

  public shift(): TElement | void {
    if (!this.head) return;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this._size--;
    return value;
  }

  public unshift(element: TElement): void {
    const newNode = new Node(element, null, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this._size++;
  }

  public delete(element: TElement): void {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === element) {
        if (currentNode.prev) {
          currentNode.prev.next = currentNode.next;
        } else {
          this.head = currentNode.next;
        }

        if (currentNode.next) {
          currentNode.next.prev = currentNode.prev;
        } else {
          this.tail = currentNode.prev;
        }

        this._size--;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  public count(): number {
    return this._size;
  }
}