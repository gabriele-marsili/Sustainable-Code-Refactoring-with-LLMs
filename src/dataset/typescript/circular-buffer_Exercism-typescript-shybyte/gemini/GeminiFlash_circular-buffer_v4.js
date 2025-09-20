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
        this.isFull = false;
        this.buf = new Array(size);
        this.size = size;
    }
    clear() {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.isFull = false;
        this.buf.fill(undefined);
    }
    write(value) {
        if (this.isFull) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }
    read() {
        if (this.indexRead === this.indexWrite && !this.isFull) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead];
        const readIndex = this.indexRead;
        this.indexRead = (this.indexRead + 1) % this.size;
        if (this.isFull) {
            this.isFull = false;
        }
        if (value === undefined) {
            throw new BufferEmptyError();
        }
        return value;
    }
    forceWrite(value) {
        if (value === undefined || value === null) {
            return;
        }
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;
        if (this.isFull === false && this.indexWrite === this.indexRead) {
            this.isFull = true;
        }
        if (this.isFull) {
            this.indexRead = (this.indexRead + 1) % this.size;
        }
    }
}
exports.default = CircularBuffer;
