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
        this.count = 0;
        this.buf = new Array(size);
    }
    clear() {
        this.buf.fill(undefined);
        this.indexWrite = 0;
        this.indexRead = 0;
        this.count = 0;
    }
    write(value) {
        if (this.count === this.buf.length) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }
    read() {
        if (this.count === 0) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead];
        this.buf[this.indexRead] = undefined;
        this.indexRead = (this.indexRead + 1) % this.buf.length;
        this.count--;
        return value;
    }
    forceWrite(value) {
        if (value === undefined || value === null) {
            return;
        }
        if (this.count === this.buf.length) {
            this.indexRead = (this.indexRead + 1) % this.buf.length;
        }
        else {
            this.count++;
        }
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.buf.length;
    }
}
exports.default = CircularBuffer;
