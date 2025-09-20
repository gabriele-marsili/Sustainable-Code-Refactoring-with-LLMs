"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._size = initial;
        this._buffer = new Array(initial);
        this._buffer.fill(null);
        this._pointer = 0;
    }
    movePointer() {
        this._pointer = (this._pointer + 1) % this._size;
    }
    moveTillAvailable() {
        const startPointer = this._pointer;
        do {
            if (this._buffer[this._pointer] === null) {
                return;
            }
            this.movePointer();
        } while (this._pointer !== startPointer);
        throw new BufferFullError();
    }
    moveTillUsed() {
        const startPointer = this._pointer;
        do {
            if (this._buffer[this._pointer] !== null) {
                return;
            }
            this.movePointer();
        } while (this._pointer !== startPointer);
        throw new BufferEmptyError();
    }
    write(value) {
        this.moveTillAvailable();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    read() {
        this.moveTillUsed();
        const info = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this.movePointer();
        return info;
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
