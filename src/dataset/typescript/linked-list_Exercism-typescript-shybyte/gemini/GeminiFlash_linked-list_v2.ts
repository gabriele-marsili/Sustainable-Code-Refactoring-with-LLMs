class Node<T> {
    value: T;
    prev: Node<T> | undefined;
    next: Node<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.prev = undefined;
        this.next = undefined;
    }
}

export default class LinkedList<T> {
    head: Node<T> | undefined;
    tail: Node<T> | undefined;
    size: number;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    push(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    pop(): T | undefined {
        if (!this.tail) {
            return undefined;
        }

        const value = this.tail.value;
        this.tail = this.tail.prev;

        if (this.tail) {
            this.tail.next = undefined;
        } else {
            this.head = undefined;
        }

        this.size--;
        return value;
    }

    shift(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;

        if (this.head) {
            this.head.prev = undefined;
        } else {
            this.tail = undefined;
        }

        this.size--;
        return value;
    }

    unshift(value: T): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    count(): number {
        return this.size;
    }

    delete(value: T): void {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                this._deleteNode(current);
                return;
            }
            current = current.next;
        }
    }

    private _deleteNode(node: Node<T>): void {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        this.size--;
    }
}