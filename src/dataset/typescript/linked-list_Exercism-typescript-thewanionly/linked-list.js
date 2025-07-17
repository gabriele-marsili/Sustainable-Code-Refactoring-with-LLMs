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
    }
    push(element) {
        const newNode = new Node(element, this.tail, null);
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.head) {
            this.head = newNode;
        }
    }
    pop() {
        if (this.tail) {
            const prevValue = this.tail.value;
            this.tail = this.tail.prev;
            if (this.tail) {
                this.tail.next = null;
            }
            else {
                this.head = null;
            }
            return prevValue;
        }
    }
    shift() {
        if (this.head) {
            const prevValue = this.head.value;
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            }
            else {
                this.tail = null;
            }
            return prevValue;
        }
    }
    unshift(element) {
        const newNode = new Node(element, null, this.head);
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
    }
    delete(element) {
        let currentNode = this.head;
        let toDeleteNode = null;
        // Find the node to be deleted
        while (currentNode) {
            if (currentNode.value === element) {
                toDeleteNode = currentNode;
                break;
            }
            currentNode = currentNode.next;
        }
        // Delete the node
        if (toDeleteNode) {
            if (toDeleteNode.prev) {
                // toDeleteNode is somewhere in the middle of the list
                toDeleteNode.prev.next = toDeleteNode.next;
            }
            else {
                // toDeleteNode is the current head
                this.head = toDeleteNode.next;
                if (this.head) {
                    this.head.prev = null;
                }
            }
            if (toDeleteNode.next) {
                // toDeleteNode is somewhere in the middle of the list
                toDeleteNode.next.prev = toDeleteNode.prev;
            }
            else {
                // toDeleteNode is the current tail
                this.tail = toDeleteNode.prev;
                if (this.tail) {
                    this.tail.next = null;
                }
            }
        }
    }
    count() {
        let currentNode = this.head;
        let count = 0;
        while (currentNode) {
            count++;
            currentNode = currentNode.next;
        }
        return count;
    }
}
exports.LinkedList = LinkedList;
