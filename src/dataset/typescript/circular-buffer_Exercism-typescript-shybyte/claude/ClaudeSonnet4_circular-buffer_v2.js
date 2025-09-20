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
        this.count = 0;
        this.size = size;
        this.buf = new Array(size);
    }
    clear() {
        this.buf.fill(undefined);
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
        this.buf[this.indexRead] = undefined;
        this.indexRead = (this.indexRead + 1) % this.size;
        this.count--;
        return value;
    }
    forceWrite(value) {
        if (value === undefined || value === null) {
            return;
        }
        const wasEmpty = this.buf[this.indexWrite] === undefined;
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;
        if (wasEmpty) {
            this.count++;
        }
        else {
            this.indexRead = (this.indexRead + 1) % this.size;
        }
    }
}
exports.default = CircularBuffer;
