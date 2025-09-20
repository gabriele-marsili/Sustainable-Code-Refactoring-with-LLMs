"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferOverflowError = void 0;
class BufferOverflowError extends Error {
    constructor() {
        super("Buffer overflow");
        this.name = "BufferOverflowError";
    }
}
exports.BufferOverflowError = BufferOverflowError;
class BufferEmptyError extends Error {
    constructor() {
        super("Buffer empty");
        this.name = "BufferEmptyError";
    }
}
exports.BufferEmptyError = BufferEmptyError;
class CircularBuffer {
    constructor(size) {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.size = size;
        this.buf = new Array(size);
    }
    clear() {
        this.buf.fill(undefined);
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
        this.indexRead = (this.indexRead + 1) % this.size;
        return value;
    }
    forceWrite(value) {
        if (value === undefined || value === null) {
            return;
        }
        const oldValue = this.buf[this.indexWrite];
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;
        if (oldValue !== undefined) {
            this.indexRead = (this.indexRead + 1) % this.size;
        }
    }
}
exports.default = CircularBuffer;
