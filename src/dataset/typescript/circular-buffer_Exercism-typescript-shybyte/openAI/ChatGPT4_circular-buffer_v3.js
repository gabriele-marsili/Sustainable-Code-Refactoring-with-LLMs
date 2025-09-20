"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class BufferOverflowError extends Error {
    constructor() {
        super("Buffer overflow");
    }
}
exports.BufferOverflowError = BufferOverflowError;
class BufferEmptyError extends Error {
    constructor() {
        super("Buffer is empty");
    }
}
exports.BufferEmptyError = BufferEmptyError;
class CircularBuffer {
    constructor(size) {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.isFull = false;
        this.buf = Array(size);
    }
    clear() {
        this.buf.fill(undefined);
        this.indexWrite = 0;
        this.indexRead = 0;
        this.isFull = false;
    }
    write(value) {
        if (this.isFull) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }
    read() {
        if (!this.isReadable()) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead];
        this.buf[this.indexRead] = undefined;
        this.indexRead = this.getWrappedIndex(this.indexRead + 1);
        this.isFull = false;
        return value;
    }
    forceWrite(value) {
        if (value == null)
            return;
        this.buf[this.indexWrite] = value;
        this.indexWrite = this.getWrappedIndex(this.indexWrite + 1);
        if (this.isFull) {
            this.indexRead = this.getWrappedIndex(this.indexRead + 1);
        }
        this.isFull = this.indexWrite === this.indexRead;
    }
    getWrappedIndex(i) {
        return i % this.buf.length;
    }
    isReadable() {
        return this.indexWrite !== this.indexRead || this.isFull;
    }
}
exports.default = CircularBuffer;
