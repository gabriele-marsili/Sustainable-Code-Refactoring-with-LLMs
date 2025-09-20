"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class BufferOverflowError extends Error {
    constructor() {
        super();
        this.name = "BufferOverflowError";
    }
}
exports.BufferOverflowError = BufferOverflowError;
class BufferEmptyError extends Error {
    constructor() {
        super();
        this.name = "BufferEmptyError";
    }
}
exports.BufferEmptyError = BufferEmptyError;
class CircularBuffer {
    constructor(size) {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.count = 0;
        this.buf = new Array(size);
        this.size = size;
    }
    clear() {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.count = 0;
    }
    write(value) {
        if (this.count === this.size) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }
    read() {
        if (this.count === 0) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead];
        this.indexRead = (this.indexRead + 1) % this.size;
        this.count--;
        return value;
    }
    forceWrite(value) {
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;
        if (this.count === this.size) {
            this.indexRead = (this.indexRead + 1) % this.size;
        }
        else {
            this.count++;
        }
    }
}
exports.default = CircularBuffer;
