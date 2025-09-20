"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(v) {
        this.value = v;
        this.previous = undefined;
        this.next = undefined;
    }
    setPrevious(p) {
        this.previous = p;
    }
    getPrevious() {
        return this.previous;
    }
    setNext(n) {
        this.next = n;
    }
    getNext() {
        return this.next;
    }
    getValue() {
        return this.value;
    }
}
class LinkedList {
    constructor() {
        this._first = undefined;
        this._last = undefined;
        this._count = 0;
    }
    push(value) {
        const newNode = new Node(value);
        if (this._last) {
            this._last.next = newNode;
            newNode.previous = this._last;
        }
        else {
            this._first = newNode;
        }
        this._last = newNode;
        this._count++;
    }
    pop() {
        if (!this._last)
            return undefined;
        const returnValue = this._last.value;
        const prevNode = this._last.previous;
        if (prevNode) {
            prevNode.next = undefined;
            this._last = prevNode;
        }
        else {
            this._first = undefined;
            this._last = undefined;
        }
        this._count--;
        return returnValue;
    }
    shift() {
        if (!this._first)
            return undefined;
        const returnValue = this._first.value;
        const nextNode = this._first.next;
        if (nextNode) {
            nextNode.previous = undefined;
            this._first = nextNode;
        }
        else {
            this._first = undefined;
            this._last = undefined;
        }
        this._count--;
        return returnValue;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (this._first) {
            this._first.previous = newNode;
            newNode.next = this._first;
        }
        else {
            this._last = newNode;
        }
        this._first = newNode;
        this._count++;
    }
    delete(value) {
        let pointer = this._first;
        while (pointer) {
            if (pointer.value === value) {
                if (pointer.previous) {
                    pointer.previous.next = pointer.next;
                }
                else {
                    this._first = pointer.next;
                }
                if (pointer.next) {
                    pointer.next.previous = pointer.previous;
                }
                else {
                    this._last = pointer.previous;
                }
                this._count--;
                return;
            }
            pointer = pointer.next;
        }
    }
    count() {
        return this._count;
    }
}
exports.LinkedList = LinkedList;
