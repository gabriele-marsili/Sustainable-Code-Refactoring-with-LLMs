"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(value, prev = null, next = null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._count = 0;
    }
    push(element) {
        const newNode = new Node(element, this.tail, null);
        if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            this.head = this.tail = newNode;
        }
        this._count++;
    }
    pop() {
        if (!this.tail)
            return;
        const prevValue = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = null;
        }
        else {
            this.head = null;
        }
        this._count--;
        return prevValue;
    }
    shift() {
        if (!this.head)
            return;
        const prevValue = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        }
        else {
            this.tail = null;
        }
        this._count--;
        return prevValue;
    }
    unshift(element) {
        const newNode = new Node(element, null, this.head);
        if (this.head) {
            this.head.prev = newNode;
            this.head = newNode;
        }
        else {
            this.head = this.tail = newNode;
        }
        this._count++;
    }
    delete(element) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === element) {
                if (currentNode.prev) {
                    currentNode.prev.next = currentNode.next;
                }
                else {
                    this.head = currentNode.next;
                    if (this.head) {
                        this.head.prev = null;
                    }
                }
                if (currentNode.next) {
                    currentNode.next.prev = currentNode.prev;
                }
                else {
                    this.tail = currentNode.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    }
                }
                this._count--;
                return;
            }
            currentNode = currentNode.next;
        }
    }
    count() {
        return this._count;
    }
}
exports.LinkedList = LinkedList;
