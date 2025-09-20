"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class CircularBuffer {
    constructor(length) {
        this.buffer = new Array(length);
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
    isFull() {
        return this.size === this.buffer.length;
    }
    read() {
        if (this.size === 0) {
            throw exports.BufferEmptyError;
        }
        const item = this.buffer[this.head];
        this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.buffer.length;
        this.size--;
        return item;
    }
    write(item) {
        if (this.isFull()) {
            throw exports.BufferOverflowError;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.buffer.length;
        this.size++;
    }
    forceWrite(item) {
        if (this.isFull()) {
            this.head = (this.head + 1) % this.buffer.length;
            this.size--;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.buffer.length;
        this.size++;
    }
    clear() {
        this.buffer.fill(undefined);
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
}
exports.default = CircularBuffer;
exports.BufferOverflowError = 'Buffer overflowed';
exports.BufferEmptyError = 'Buffer is empty';
