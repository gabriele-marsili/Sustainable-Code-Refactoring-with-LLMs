class Node<T> {
    value: T
    prevNode: Node<T> | null
    nextNode: Node<T> | null

    constructor(value: T, prevNode: Node<T> | null = null, nextNode: Node<T> | null = null) {
        this.value = value
        this.prevNode = prevNode
        this.nextNode = nextNode
    }
}

export default class LinkedList<T> {
    front: Node<T> | null
    back: Node<T> | null
    _count: number

    constructor() {
        this.front = null
        this.back = null
        this._count = 0
    }

    push(value: T) {
        const newNode = new Node(value, this.back)
        if (this.back) {
            this.back.nextNode = newNode
        } else {
            this.front = newNode
        }
        this.back = newNode
        this._count++
    }

    pop() {
        if (!this.back) {
            return
        }

        const value = this.back.value
        this.back = this.back.prevNode
        
        if (this.back) {
            this.back.nextNode = null
        } else {
            this.front = null
        }
        
        this._count--
        return value
    }

    shift() {
        if (!this.front) {
            return
        }

        const value = this.front.value
        this.front = this.front.nextNode
        
        if (this.front) {
            this.front.prevNode = null
        } else {
            this.back = null
        }
        
        this._count--
        return value
    }

    unshift(value: T) {
        const newNode = new Node(value, null, this.front)
        if (this.front) {
            this.front.prevNode = newNode
        } else {
            this.back = newNode
        }
        this.front = newNode
        this._count++
    }

    count() {
        return this._count
    }

    'delete'(value: T) {
        let current = this.front
        while (current) {
            if (current.value === value) {
                this._deleteNode(current)
                return
            }
            current = current.nextNode
        }
    }

    _deleteNode(node: Node<T>) {
        if (node === this.front && node === this.back) {
            this.front = null
            this.back = null
        } else if (node === this.front) {
            this.front = node.nextNode!
            this.front.prevNode = null
        } else if (node === this.back) {
            this.back = node.prevNode!
            this.back.nextNode = null
        } else {
            node.prevNode!.nextNode = node.nextNode
            node.nextNode!.prevNode = node.prevNode
        }
        this._count--
    }
}