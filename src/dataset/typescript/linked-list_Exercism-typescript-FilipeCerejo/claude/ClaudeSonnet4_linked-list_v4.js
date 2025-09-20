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
        this._size = 0;
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
        this._size++;
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
        this._size--;
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
        this._size--;
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
        this._size++;
    }
    delete(value) {
        let pointer = this._first;
        while (pointer) {
            if (pointer.value === value) {
                if (pointer.next) {
                    pointer.next.previous = pointer.previous;
                }
                else {
                    this._last = pointer.previous;
                }
                if (pointer.previous) {
                    pointer.previous.next = pointer.next;
                }
                else {
                    this._first = pointer.next;
                }
                this._size--;
                return;
            }
            pointer = pointer.next;
        }
    }
    count() {
        return this._size;
    }
}
exports.LinkedList = LinkedList;
