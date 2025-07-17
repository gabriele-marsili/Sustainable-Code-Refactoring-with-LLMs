"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value, prevNode, nextNode) {
        this.value = value;
        this.prevNode = prevNode;
        this.nextNode = nextNode;
    }
}
class LinkedList {
    constructor() {
        this.front = undefined;
        this.back = undefined;
        this._count = 0;
    }
    push(value) {
        const newNode = new Node(value, this.back);
        if (this.back) {
            this.back.nextNode = newNode;
        }
        this.back = newNode;
        if (!this.front) {
            this.front = newNode;
        }
        this._count += 1;
    }
    pop() {
        const back = this.back;
        if (!back) {
            return;
        }
        const value = back.value;
        if (back.prevNode) {
            back.prevNode.nextNode = undefined;
        }
        if (this.back === this.front) {
            this.front = back.prevNode;
        }
        this.back = back.prevNode;
        this._count -= 1;
        return value;
    }
    shift() {
        const front = this.front;
        if (!front) {
            return;
        }
        const value = front.value;
        if (front.nextNode) {
            front.nextNode.prevNode = undefined;
        }
        if (this.back === this.front) {
            this.back = front.prevNode;
        }
        this.front = front.nextNode;
        this._count -= 1;
        return value;
    }
    unshift(value) {
        const newNode = new Node(value, undefined, this.front);
        if (this.front) {
            this.front.prevNode = newNode;
        }
        this.front = newNode;
        if (!this.back) {
            this.back = newNode;
        }
        this._count += 1;
    }
    count() {
        return this._count;
    }
    'delete'(value) {
        let nextNode = this.front;
        while (nextNode) {
            if (nextNode.value === value) {
                this._deleteNode(nextNode);
                return;
            }
            nextNode = nextNode.nextNode;
        }
    }
    _deleteNode(node) {
        switch (node) {
            case this.front:
                this.shift();
                return;
            case this.back:
                this.pop();
                return;
            default:
                node.prevNode.nextNode = node.nextNode;
                node.nextNode.prevNode = node.prevNode;
                this._count -= 1;
                return;
        }
    }
}
exports.default = LinkedList;
