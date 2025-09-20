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
        else {
            this.front = newNode;
        }
        this.back = newNode;
        this._count++;
    }
    pop() {
        if (!this.back) {
            return;
        }
        const value = this.back.value;
        const prevNode = this.back.prevNode;
        if (prevNode) {
            prevNode.nextNode = undefined;
            this.back = prevNode;
        }
        else {
            this.front = undefined;
            this.back = undefined;
        }
        this._count--;
        return value;
    }
    shift() {
        if (!this.front) {
            return;
        }
        const value = this.front.value;
        const nextNode = this.front.nextNode;
        if (nextNode) {
            nextNode.prevNode = undefined;
            this.front = nextNode;
        }
        else {
            this.front = undefined;
            this.back = undefined;
        }
        this._count--;
        return value;
    }
    unshift(value) {
        const newNode = new Node(value, undefined, this.front);
        if (this.front) {
            this.front.prevNode = newNode;
        }
        else {
            this.back = newNode;
        }
        this.front = newNode;
        this._count++;
    }
    count() {
        return this._count;
    }
    'delete'(value) {
        let currentNode = this.front;
        while (currentNode) {
            if (currentNode.value === value) {
                this._deleteNode(currentNode);
                return;
            }
            currentNode = currentNode.nextNode;
        }
    }
    _deleteNode(node) {
        if (node === this.front && node === this.back) {
            this.front = undefined;
            this.back = undefined;
        }
        else if (node === this.front) {
            this.front = node.nextNode;
            this.front.prevNode = undefined;
        }
        else if (node === this.back) {
            this.back = node.prevNode;
            this.back.nextNode = undefined;
        }
        else {
            node.prevNode.nextNode = node.nextNode;
            node.nextNode.prevNode = node.prevNode;
        }
        this._count--;
    }
}
exports.default = LinkedList;
