"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class CircularBuffer {
    constructor(length) {
        this.buffer = new Array();
        this.length = length;
    }
    isFull() {
        return this.buffer.length === this.length;
    }
    read() {
        const firstAdded = this.buffer.shift();
        if (firstAdded === undefined) {
            throw exports.BufferEmptyError;
        }
        return firstAdded;
    }
    write(item) {
        if (this.isFull()) {
            throw exports.BufferOverflowError;
        }
        this.buffer.push(item);
    }
    forceWrite(item) {
        if (this.isFull()) {
            this.buffer.shift();
        }
        this.buffer.push(item);
    }
    clear() {
        this.buffer.length = 0;
    }
}
exports.default = CircularBuffer;
exports.BufferOverflowError = 'Buffer overflowed';
exports.BufferEmptyError = 'Buffer is empty';
