"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferEmptyError = exports.BufferFullError = void 0;
class CircularBuffer {
    constructor(initial) {
        this._buffer = Array.from({ length: initial }, () => null);
        this._pointer = 0;
    }
    movePointer() {
        this._pointer = this._pointer + 1 === this._buffer.length ? 0 : this._pointer + 1;
    }
    moveTillAvailable() {
        for (let i = 0; i < this._buffer.length; i++) {
            if (this._buffer[this._pointer]) {
                this.movePointer();
            }
            else {
                return;
            }
        }
        throw new BufferFullError();
    }
    moveTillUsed() {
        for (let i = 0; i < this._buffer.length; i++) {
            if (this._buffer[this._pointer]) {
                return;
            }
            else {
                this.movePointer();
            }
        }
        throw new BufferEmptyError();
    }
    write(value) {
        this.moveTillAvailable();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    read() {
        this.moveTillUsed();
        let info = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this.movePointer();
        return info;
    }
    forceWrite(value) {
        this._buffer[this._pointer] = value;
        this.movePointer();
    }
    clear() {
        this._buffer = Array.from({ length: this._buffer.length }, () => null);
    }
}
exports.default = CircularBuffer;
class BufferFullError extends Error {
    constructor() {
        super();
    }
}
exports.BufferFullError = BufferFullError;
class BufferEmptyError extends Error {
    constructor() {
        super();
    }
}
exports.BufferEmptyError = BufferEmptyError;
