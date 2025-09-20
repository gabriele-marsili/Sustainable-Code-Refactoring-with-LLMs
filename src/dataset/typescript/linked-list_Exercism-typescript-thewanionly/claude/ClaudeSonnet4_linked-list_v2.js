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
        this.size = 0;
    }
    push(element) {
        const newNode = new Node(element, this.tail, null);
        if (this.tail) {
            this.tail.next = newNode;
        }
        else {
            this.head = newNode;
        }
        this.tail = newNode;
        this.size++;
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
        this.size--;
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
        this.size--;
        return prevValue;
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
        this.size++;
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
                this.size--;
                return;
            }
            currentNode = currentNode.next;
        }
    }
    count() {
        return this.size;
    }
}
exports.LinkedList = LinkedList;
