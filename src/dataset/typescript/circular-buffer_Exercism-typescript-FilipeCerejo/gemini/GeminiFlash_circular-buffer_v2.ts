export default class CircularBuffer<T> {
    private _pointer: number;
    private _buffer: (T | undefined)[];
    private _size: number;
    private _count: number;

    constructor(initial: number) {
        this._buffer = new Array<T | undefined>(initial);
        this._pointer = 0;
        this._size = initial;
        this._count = 0;
    }

    write(value: T): void {
        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
        if (this._count < this._size) {
            this._count++;
        }
    }

    read(): T {
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

    forceWrite(value: T): void {
        this._buffer[this._pointer] = value;
        this._pointer = (this._pointer + 1) % this._size;
        if (this._count < this._size) {
            this._count++;
        }
    }

    clear(): void {
        this._buffer = new Array<T | undefined>(this._size);
        this._pointer = 0;
        this._count = 0;
    }

    get size(): number {
        return this._size;
    }

    get count(): number {
        return this._count;
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