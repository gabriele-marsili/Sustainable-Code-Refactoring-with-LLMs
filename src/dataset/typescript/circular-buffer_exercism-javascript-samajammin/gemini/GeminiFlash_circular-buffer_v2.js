"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class CircularBuffer {
    constructor(capacity) {
        this.buffer = new Array(capacity);
        this.capacity = capacity;
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
    isFull() {
        return this.size === this.capacity;
    }
    isEmpty() {
        return this.size === 0;
    }
    read() {
        if (this.isEmpty()) {
            throw exports.BufferEmptyError;
        }
        const value = this.buffer[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.size--;
        return value;
    }
    write(item) {
        if (this.isFull()) {
            throw exports.BufferOverflowError;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.size++;
    }
    forceWrite(item) {
        if (this.isFull()) {
            this.head = (this.head + 1) % this.capacity;
        }
        else {
            this.size++;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
    }
    clear() {
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
}
exports.default = CircularBuffer;
exports.BufferOverflowError = 'Buffer overflowed';
exports.BufferEmptyError = 'Buffer is empty';
