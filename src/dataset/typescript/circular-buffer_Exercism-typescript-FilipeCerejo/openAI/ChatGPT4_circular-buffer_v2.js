"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._pointer = 0;
        this._buffer = new Array(initial).fill(null);
    }
    movePointer() {
        this._pointer = (this._pointer + 1) % this._buffer.length;
    }
    findAvailableSlot() {
        if (this._buffer[this._pointer] !== null) {
            throw new BufferFullError();
        }
    }
    findUsedSlot() {
        if (this._buffer[this._pointer] === null) {
            throw new BufferEmptyError();
        }
    }
    write(value) {
        this.findAvailableSlot();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    read() {
        this.findUsedSlot();
        const value = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this.movePointer();
        return value;
    }
    forceWrite(value) {
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    clear() {
        this._buffer.fill(null);
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
