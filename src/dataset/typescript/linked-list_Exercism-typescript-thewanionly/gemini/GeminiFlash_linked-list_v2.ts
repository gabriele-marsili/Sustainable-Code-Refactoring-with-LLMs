type NodeType<T> = Node<T> | null

class Node<T> {
  value: T
  next: NodeType<T>
  prev: NodeType<T>

  constructor(value: T, prev: NodeType<T> = null, next: NodeType<T> = null) {
    this.value = value
    this.prev = prev
    this.next = next
  }
}

export class LinkedList<TElement> {
  head: NodeType<TElement>
  tail: NodeType<TElement>
  private _size: number;

  constructor() {
    this.head = null
    this.tail = null
    this._size = 0;
  }

  public push(element: TElement): void {
    const newNode = new Node(element, this.tail, null)

    if (this.tail) {
      this.tail.next = newNode
    } else {
      this.head = newNode;
    }

    this.tail = newNode

    if (!this.head) {
      this.head = newNode
    }

    this._size++;
  }

  public pop(): TElement | undefined {
    if (!this.tail) {
      return undefined;
    }

    const prevValue = this.tail.value
    this.tail = this.tail.prev

    if (this.tail) {
      this.tail.next = null
    } else {
      this.head = null
    }

    this._size--;
    return prevValue
  }

  public shift(): TElement | undefined {
    if (!this.head) {
      return undefined;
    }

    const prevValue = this.head.value
    this.head = this.head.next

    if (this.head) {
      this.head.prev = null
    } else {
      this.tail = null
    }

    this._size--;
    return prevValue
  }

  public unshift(element: TElement): void {
    const newNode = new Node(element, null, this.head)

    if (this.head) {
      this.head.prev = newNode
    } else {
      this.tail = newNode;
    }

    this.head = newNode

    if (!this.tail) {
      this.tail = newNode
    }

    this._size++;
  }

  public delete(element: TElement): void {
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === element) {
        if (currentNode.prev) {
          currentNode.prev.next = currentNode.next
        } else {
          this.head = currentNode.next
          if (this.head) {
            this.head.prev = null;
          }
        }

        if (currentNode.next) {
          currentNode.next.prev = currentNode.prev
        } else {
          this.tail = currentNode.prev
          if (this.tail) {
            this.tail.next = null;
          }
        }

        this._size--;
        return;
      }

      currentNode = currentNode.next
    }
  }

  public count(): number {
    return this._size;
  }
}