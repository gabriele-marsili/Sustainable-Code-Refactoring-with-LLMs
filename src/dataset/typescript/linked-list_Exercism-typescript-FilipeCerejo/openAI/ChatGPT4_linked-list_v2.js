"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(_value, _previous, _next) {
        this._value = _value;
        this._previous = _previous;
        this._next = _next;
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
        this._size = 0;
    }
    push(value) {
        const newNode = new Node(value, this._last);
        if (this._last) {
            this._last.setNext(newNode);
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
        const returnValue = this._last.getValue();
        this._last = this._last.getPrevious();
        if (this._last) {
            this._last.setNext(undefined);
        }
        else {
            this._first = undefined;
        }
        this._size--;
        return returnValue;
    }
    shift() {
        if (!this._first)
            return undefined;
        const returnValue = this._first.getValue();
        this._first = this._first.getNext();
        if (this._first) {
            this._first.setPrevious(undefined);
        }
        else {
            this._last = undefined;
        }
        this._size--;
        return returnValue;
    }
    unshift(value) {
        const newNode = new Node(value, undefined, this._first);
        if (this._first) {
            this._first.setPrevious(newNode);
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
            if (pointer.getValue() === value) {
                const prev = pointer.getPrevious();
                const next = pointer.getNext();
                if (prev) {
                    prev.setNext(next);
                }
                else {
                    this._first = next;
                }
                if (next) {
                    next.setPrevious(prev);
                }
                else {
                    this._last = prev;
                }
                this._size--;
                return;
            }
            pointer = pointer.getNext();
        }
    }
    count() {
        return this._size;
    }
}
exports.LinkedList = LinkedList;
