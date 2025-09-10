export default class CircularBuffer<T> {
    private _pointer: number;
    private _buffer: (T | null)[];
    private _size: number;
    private _count: number;

    constructor(initial: number) {
        this._buffer = new Array(initial).fill(null);
        this._size = initial;
        this._pointer = 0;
        this._count = 0;
    }

    write(value: T): void {
        if (this._count === this._size) {
            throw new BufferFullError();
        }

        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
        this._count++;
    }

    read(): T {
        if (this._count === 0) {
            throw new BufferEmptyError();
        }

        const value = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this._pointer = (this._pointer + 1) % this._size;
        this._count--;
        return value!;
    }

    forceWrite(value: T): void {
        if (this._count < this._size) {
            this._count++;
        }
        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
    }

    clear(): void {
        this._buffer.fill(null);
        this._pointer = 0;
        this._count = 0;
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