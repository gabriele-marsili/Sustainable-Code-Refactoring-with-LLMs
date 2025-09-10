class Node<T> {
    constructor(
        public value: T,
        public prevNode?: Node<T>,
        public nextNode?: Node<T>
    ) {}
}

export default class LinkedList<T> {
    private front: Node<T> | undefined;
    private back: Node<T> | undefined;
    private _count: number;

    constructor() {
        this.front = undefined;
        this.back = undefined;
        this._count = 0;
    }

    push(value: T): void {
        const newNode = new Node(value, this.back);
        if (this.back) {
            this.back.nextNode = newNode;
        } else {
            this.front = newNode;
        }
        this.back = newNode;
        this._count++;
    }

    pop(): T | undefined {
        if (!this.back) return undefined;

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
        if (!this.front) return undefined;

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
        const newNode = new Node(value, undefined, this.front);
        if (this.front) {
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

    delete(value: T): void {
        let current = this.front;
        while (current) {
            if (current.value === value) {
                this._deleteNode(current);
                return;
            }
            current = current.nextNode;
        }
    }

    private _deleteNode(node: Node<T>): void {
        if (node === this.front) {
            this.shift();
        } else if (node === this.back) {
            this.pop();
        } else {
            node.prevNode!.nextNode = node.nextNode;
            node.nextNode!.prevNode = node.prevNode;
            this._count--;
        }
    }
}