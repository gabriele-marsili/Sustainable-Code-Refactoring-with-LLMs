"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.previous = undefined;
        this.next = undefined;
    }
}
class LinkedList {
    constructor() {
        this.first = undefined;
        this.last = undefined;
        this.size = 0;
    }
    push(value) {
        const newNode = new Node(value);
        if (this.last) {
            newNode.previous = this.last;
            this.last.next = newNode;
            this.last = newNode;
        }
        else {
            this.first = newNode;
            this.last = newNode;
        }
        this.size++;
    }
    pop() {
        if (!this.last)
            return undefined;
        const returnValue = this.last.value;
        if (this.last.previous) {
            this.last = this.last.previous;
            this.last.next = undefined;
        }
        else {
            this.first = undefined;
            this.last = undefined;
        }
        this.size = Math.max(0, this.size - 1);
        return returnValue;
    }
    shift() {
        if (!this.first)
            return undefined;
        const returnValue = this.first.value;
        if (this.first.next) {
            this.first = this.first.next;
            this.first.previous = undefined;
        }
        else {
            this.last = undefined;
            this.first = undefined;
        }
        this.size = Math.max(0, this.size - 1);
        return returnValue;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (this.first) {
            newNode.next = this.first;
            this.first.previous = newNode;
            this.first = newNode;
        }
        else {
            this.first = newNode;
            this.last = newNode;
        }
        this.size++;
    }
    delete(value) {
        let current = this.first;
        while (current) {
            if (current.value === value) {
                if (current.previous) {
                    current.previous.next = current.next;
                }
                else {
                    this.first = current.next;
                }
                if (current.next) {
                    current.next.previous = current.previous;
                }
                else {
                    this.last = current.previous;
                }
                this.size = Math.max(0, this.size - 1);
                return;
            }
            current = current.next;
        }
    }
    count() {
        return this.size;
    }
}
exports.LinkedList = LinkedList;
