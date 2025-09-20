"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class CircularBuffer {
    constructor(length) {
        this.capacity = length;
        this.buffer = new Array(length);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }
    isFull() {
        return this.count === this.capacity;
    }
    read() {
        if (this.count === 0) {
            throw exports.BufferEmptyError;
        }
        const item = this.buffer[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.count--;
        return item;
    }
    write(item) {
        if (this.isFull()) {
            throw exports.BufferOverflowError;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.count++;
    }
    forceWrite(item) {
        if (this.isFull()) {
            this.head = (this.head + 1) % this.capacity;
            this.count--;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.count++;
    }
    clear() {
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }
}
exports.default = CircularBuffer;
exports.BufferOverflowError = 'Buffer overflowed';
exports.BufferEmptyError = 'Buffer is empty';
