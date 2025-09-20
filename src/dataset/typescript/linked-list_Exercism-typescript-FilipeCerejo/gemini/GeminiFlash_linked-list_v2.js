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
        this._size = 0;
    }
    push(value) {
        const newNode = new Node(value);
        if (this.last) {
            this.last.next = newNode;
            newNode.previous = this.last;
            this.last = newNode;
        }
        else {
            this.first = newNode;
            this.last = newNode;
        }
        this._size++;
    }
    pop() {
        if (!this.last)
            return undefined;
        const returnValue = this.last.value;
        this.last = this.last.previous;
        if (this.last) {
            this.last.next = undefined;
        }
        else {
            this.first = undefined;
        }
        this._size--;
        return returnValue;
    }
    shift() {
        if (!this.first)
            return undefined;
        const returnValue = this.first.value;
        this.first = this.first.next;
        if (this.first) {
            this.first.previous = undefined;
        }
        else {
            this.last = undefined;
        }
        this._size--;
        return returnValue;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (this.first) {
            this.first.previous = newNode;
            newNode.next = this.first;
            this.first = newNode;
        }
        else {
            this.first = newNode;
            this.last = newNode;
        }
        this._size++;
    }
    delete(value) {
        let pointer = this.first;
        while (pointer) {
            if (pointer.value === value) {
                break;
            }
            pointer = pointer.next;
        }
        if (pointer) {
            if (pointer.previous) {
                pointer.previous.next = pointer.next;
            }
            else {
                this.first = pointer.next;
            }
            if (pointer.next) {
                pointer.next.previous = pointer.previous;
            }
            else {
                this.last = pointer.previous;
            }
            this._size--;
        }
    }
    count() {
        return this._size;
    }
}
exports.LinkedList = LinkedList;
