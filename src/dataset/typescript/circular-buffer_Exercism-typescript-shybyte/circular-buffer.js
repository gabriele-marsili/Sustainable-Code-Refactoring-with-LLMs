"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class BufferOverflowError extends Error {
    constructor() {
        super();
    }
}
exports.BufferOverflowError = BufferOverflowError;
class BufferEmptyError extends Error {
    constructor() {
        super();
    }
}
exports.BufferEmptyError = BufferEmptyError;
class CircularBuffer {
    constructor(size) {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.getIncreasedWrappedIndex = (i) => (i + 1) % this.buf.length;
        this.buf = new Array(size);
    }
    clear() {
        this.buf = new Array(this.buf.length);
        this.indexWrite = 0;
        this.indexRead = 0;
    }
    write(value) {
        if (this.buf[this.indexWrite] !== undefined) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }
    read() {
        const value = this.buf[this.indexRead];
        if (value === undefined) {
            throw new BufferEmptyError();
        }
        this.buf[this.indexRead] = undefined;
        this.indexRead = this.getIncreasedWrappedIndex(this.indexRead);
        return value;
    }
    forceWrite(value) {
        if (value === undefined || value === null) {
            return;
        }
        const oldValue = this.buf[this.indexWrite];
        this.buf[this.indexWrite] = value;
        this.indexWrite = this.getIncreasedWrappedIndex(this.indexWrite);
        if (oldValue !== undefined) {
            this.indexRead = this.getIncreasedWrappedIndex(this.indexRead);
        }
    }
}
exports.default = CircularBuffer;
