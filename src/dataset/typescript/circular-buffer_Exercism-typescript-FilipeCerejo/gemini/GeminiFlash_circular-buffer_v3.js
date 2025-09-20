"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._buffer = new Array(initial).fill(null);
        this._pointer = 0;
        this._size = initial;
        this._count = 0;
    }
    movePointer() {
        this._pointer = (this._pointer + 1) % this._size;
    }
    write(value) {
        if (this._count === this._size) {
            throw new BufferFullError();
        }
        this._buffer[this._pointer] = value;
        this.movePointer();
        this._count++;
    }
    read() {
        if (this._count === 0) {
            throw new BufferEmptyError();
        }
        const value = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this.movePointer();
        this._count--;
        return value;
    }
    forceWrite(value) {
        if (this._count < this._size) {
            this._count++;
        }
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    clear() {
        this._buffer.fill(null);
        this._pointer = 0;
        this._count = 0;
    }
}
exports.default = CircularBuffer;
class BufferFullError extends Error {
    constructor() {
        super("Buffer is full");
        this.name = "BufferFullError";
    }
}
exports.BufferFullError = BufferFullError;
class BufferEmptyError extends Error {
    constructor() {
        super("Buffer is empty");
        this.name = "BufferEmptyError";
    }
}
exports.BufferEmptyError = BufferEmptyError;
