class Node<T> {
    value: T;
    prevNode: Node<T> | undefined;
    nextNode: Node<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.prevNode = undefined;
        this.nextNode = undefined;
    }
}

export default class LinkedList<T> {
    front: Node<T> | undefined;
    back: Node<T> | undefined;
    private _count: number;

    constructor() {
        this.front = undefined;
        this.back = undefined;
        this._count = 0;
    }

    push(value: T): void {
        const newNode = new Node(value);
        if (this.back) {
            newNode.prevNode = this.back;
            this.back.nextNode = newNode;
        } else {
            this.front = newNode;
        }
        this.back = newNode;
        this._count++;
    }

    pop(): T | undefined {
        if (!this.back) {
            return undefined;
        }

        const value = this.back.value;
        this.back = this.back.prevNode;

        if (this.back) {
            this.back.nextNode = undefined;
        } else {
            this.front = undefined;
        }

        this._count--;
        return value;
    }

    shift(): T | undefined {
        if (!this.front) {
            return undefined;
        }

        const value = this.front.value;
        this.front = this.front.nextNode;

        if (this.front) {
            this.front.prevNode = undefined;
        } else {
            this.back = undefined;
        }

        this._count--;
        return value;
    }

    unshift(value: T): void {
        const newNode = new Node(value);
        if (this.front) {
            newNode.nextNode = this.front;
            this.front.prevNode = newNode;
        } else {
            this.back = newNode;
        }
        this.front = newNode;
        this._count++;
    }

    count(): number {
        return this._count;
    }

    'delete'(value: T): void {
        let currentNode = this.front;
        while (currentNode) {
            if (currentNode.value === value) {
                this._deleteNode(currentNode);
                return;
            }
            currentNode = currentNode.nextNode;
        }
    }

    private _deleteNode(node: Node<T>): void {
        if (node.prevNode) {
            node.prevNode.nextNode = node.nextNode;
        } else {
            this.front = node.nextNode;
        }

        if (node.nextNode) {
            node.nextNode.prevNode = node.prevNode;
        } else {
            this.back = node.prevNode;
        }

        this._count--;
    }
}