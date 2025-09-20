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
        this._size = 0;
        this.head = null;
        this.tail = null;
    }
    push(element) {
        const newNode = new Node(element, this.tail);
        if (this.tail) {
            this.tail.next = newNode;
        }
        else {
            this.head = newNode;
        }
        this.tail = newNode;
        this._size++;
    }
    pop() {
        if (!this.tail)
            return;
        const value = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = null;
        }
        else {
            this.head = null;
        }
        this._size--;
        return value;
    }
    shift() {
        if (!this.head)
            return;
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        }
        else {
            this.tail = null;
        }
        this._size--;
        return value;
    }
    unshift(element) {
        const newNode = new Node(element, null, this.head);
        if (this.head) {
            this.head.prev = newNode;
        }
        else {
            this.tail = newNode;
        }
        this.head = newNode;
        this._size++;
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
                }
                if (currentNode.next) {
                    currentNode.next.prev = currentNode.prev;
                }
                else {
                    this.tail = currentNode.prev;
                }
                this._size--;
                return;
            }
            currentNode = currentNode.next;
        }
    }
    count() {
        return this._size;
    }
}
exports.LinkedList = LinkedList;
