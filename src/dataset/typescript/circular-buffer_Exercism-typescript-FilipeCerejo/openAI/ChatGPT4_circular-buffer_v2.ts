export default class CircularBuffer<T> {
    private _pointer: number = 0;
    private _buffer: (T | null)[];

    constructor(initial: number) {
        this._buffer = new Array(initial).fill(null);
    }

    private movePointer(): void {
        this._pointer = (this._pointer + 1) % this._buffer.length;
    }

    private findAvailableSlot(): void {
        if (this._buffer[this._pointer] !== null) {
            throw new BufferFullError();
        }
    }

    private findUsedSlot(): void {
        if (this._buffer[this._pointer] === null) {
            throw new BufferEmptyError();
        }
    }

    write(value: T): void {
        this.findAvailableSlot();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    read(): T {
        this.findUsedSlot();
        const value = this._buffer[this._pointer]!;
        this._buffer[this._pointer] = null;
        this.movePointer();
        return value;
    }

    forceWrite(value: T): void {
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    clear(): void {
        this._buffer.fill(null);
    }
}

export class BufferFullError extends Error {
    constructor() {
        super("Buffer is full");
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super("Buffer is empty");
    }
}