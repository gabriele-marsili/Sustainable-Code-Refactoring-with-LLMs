"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._buffer = new Array(initial);
        this._pointer = 0;
        this._size = initial;
        this._count = 0;
    }
    write(value) {
        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
        if (this._count < this._size) {
            this._count++;
        }
    }
    read() {
        if (this._count === 0) {
            throw new BufferEmptyError();
        }
        const value = this._buffer[this._pointer];
        if (value === undefined) {
            throw new Error("Unexpected undefined value in buffer");
        }
        this._buffer[this._pointer] = undefined;
        this._pointer = (this._pointer + 1) % this._size;
        this._count--;
        return value;
    }
    forceWrite(value) {
        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
        if (this._count < this._size) {
            this._count++;
        }
    }
    clear() {
        this._buffer = new Array(this._size);
        this._pointer = 0;
        this._count = 0;
    }
    get size() {
        return this._size;
    }
    get count() {
        return this._count;
    }
}
exports.default = CircularBuffer;
class BufferFullError extends Error {
    constructor() {
        super("Buffer is full");
    }
}
exports.BufferFullError = BufferFullError;
class BufferEmptyError extends Error {
    constructor() {
        super("Buffer is empty");
    }
}
exports.BufferEmptyError = BufferEmptyError;
