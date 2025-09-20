"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._buffer = new Array(initial);
        this._buffer.fill(null);
        this._pointer = 0;
        this._size = initial;
        this._count = 0;
    }
    movePointer() {
        this._pointer = (this._pointer + 1) % this._size;
    }
    moveTillAvailable() {
        if (this._count === this._size) {
            throw new BufferFullError();
        }
        while (this._buffer[this._pointer] !== null) {
            this.movePointer();
        }
    }
    moveTillUsed() {
        if (this._count === 0) {
            throw new BufferEmptyError();
        }
        while (this._buffer[this._pointer] === null) {
            this.movePointer();
        }
    }
    write(value) {
        this.moveTillAvailable();
        this._buffer[this._pointer] = value;
        this._count++;
        this.movePointer();
    }
    read() {
        this.moveTillUsed();
        const info = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this._count--;
        this.movePointer();
        return info;
    }
    forceWrite(value) {
        if (this._buffer[this._pointer] === null) {
            this._count++;
        }
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    clear() {
        this._buffer.fill(null);
        this._count = 0;
        this._pointer = 0;
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
