"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value) {
        this.value = value;
        this.prev = undefined;
        this.next = undefined;
    }
}
class LinkedList {
    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }
    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    pop() {
        if (!this.tail) {
            return undefined;
        }
        const value = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = undefined;
        }
        else {
            this.head = undefined;
        }
        this.size--;
        return value;
    }
    shift() {
        if (!this.head) {
            return undefined;
        }
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = undefined;
        }
        else {
            this.tail = undefined;
        }
        this.size--;
        return value;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }
    count() {
        return this.size;
    }
    delete(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                this._deleteNode(current);
                return;
            }
            current = current.next;
        }
    }
    _deleteNode(node) {
        if (node.prev) {
            node.prev.next = node.next;
        }
        else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        else {
            this.tail = node.prev;
        }
        this.size--;
    }
}
exports.default = LinkedList;
