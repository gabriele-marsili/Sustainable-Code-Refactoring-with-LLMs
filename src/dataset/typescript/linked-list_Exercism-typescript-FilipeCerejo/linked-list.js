"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(v) {
        this._value = v;
        this._previous = undefined;
        this._next = undefined;
    }
    setPrevious(p) {
        this._previous = p;
    }
    getPrevious() {
        return this._previous;
    }
    setNext(n) {
        this._next = n;
    }
    getNext() {
        return this._next;
    }
    getValue() {
        return this._value;
    }
}
class LinkedList {
    constructor() {
        this._first = undefined;
        this._last = undefined;
    }
    push(value) {
        const newNode = new Node(value);
        if (this._last) {
            this._last.setNext(newNode);
            newNode.setPrevious(this._last);
        }
        else {
            this._first = newNode;
        }
        this._last = newNode;
    }
    pop() {
        if (!this._last)
            return undefined;
        let returnValue = this._last;
        if (this._last.getPrevious()) {
            let prevNode = this._last.getPrevious();
            prevNode.setNext(undefined);
            this._last.setPrevious(undefined);
            this._last = prevNode;
        }
        else {
            this._first = undefined;
            this._last = undefined;
        }
        return returnValue.getValue();
    }
    shift() {
        if (!this._first)
            return undefined;
        let returnValue = this._first;
        if (this._first.getNext()) {
            let nextNode = this._first.getNext();
            nextNode.setPrevious(undefined);
            this._first.setNext(undefined);
            this._first = nextNode;
        }
        else {
            this._last = undefined;
            this._first = undefined;
        }
        return returnValue.getValue();
    }
    unshift(value) {
        const newNode = new Node(value);
        if (this._first) {
            this._first.setPrevious(newNode);
            newNode.setNext(this._first);
        }
        else {
            this._last = newNode;
        }
        this._first = newNode;
    }
    delete(value) {
        let pointer = this._first;
        while (pointer) {
            if (pointer.getValue() === value)
                break;
            pointer = pointer.getNext();
        }
        //If there is a value
        if (pointer) {
            if (!pointer.getNext() && !pointer.getPrevious()) {
                this._first = undefined;
                this._last = undefined;
            }
            else {
                if (pointer.getNext()) {
                    pointer.getNext().setPrevious(pointer.getPrevious());
                }
                if (pointer.getPrevious()) {
                    pointer.getPrevious().setNext(pointer.getNext());
                }
            }
        }
    }
    count() {
        let count = 0;
        let pointer = this._first;
        while (pointer) {
            count++;
            pointer = pointer.getNext();
        }
        return count;
    }
}
exports.LinkedList = LinkedList;
