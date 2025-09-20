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
        if (!this.back)
            return undefined;
        const value = this.back.value;
        this.back = this.back.prevNode;
        if (this.back) {
            this.back.nextNode = undefined;
        }
        else {
            this.front = undefined;
        }
        this._count--;
        return value;
    }
    shift() {
        if (!this.front)
            return undefined;
        const value = this.front.value;
        this.front = this.front.nextNode;
        if (this.front) {
            this.front.prevNode = undefined;
        }
        else {
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
    delete(value) {
        let current = this.front;
        while (current) {
            if (current.value === value) {
                this._deleteNode(current);
                return;
            }
            current = current.nextNode;
        }
    }
    _deleteNode(node) {
        if (node === this.front) {
            this.shift();
        }
        else if (node === this.back) {
            this.pop();
        }
        else {
            node.prevNode.nextNode = node.nextNode;
            node.nextNode.prevNode = node.prevNode;
            this._count--;
        }
    }
}
exports.default = LinkedList;
