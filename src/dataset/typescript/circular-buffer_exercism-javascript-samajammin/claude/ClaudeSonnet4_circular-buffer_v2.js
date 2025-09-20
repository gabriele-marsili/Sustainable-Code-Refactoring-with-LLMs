"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class CircularBuffer {
    constructor(length) {
        this.head = 0;
        this.tail = 0;
        this.size = 0;
        this.buffer = new Array(length);
        this.capacity = length;
    }
    isFull() {
        return this.size === this.capacity;
    }
    read() {
        if (this.size === 0) {
            throw exports.BufferEmptyError;
        }
        const item = this.buffer[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.size--;
        return item;
    }
    write(item) {
        if (this.size === this.capacity) {
            throw exports.BufferOverflowError;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.size++;
    }
    forceWrite(item) {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        if (this.size === this.capacity) {
            this.head = (this.head + 1) % this.capacity;
        }
        else {
            this.size++;
        }
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
