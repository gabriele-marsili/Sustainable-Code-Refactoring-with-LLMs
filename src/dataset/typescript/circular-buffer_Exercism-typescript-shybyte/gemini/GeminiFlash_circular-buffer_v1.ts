export class BufferOverflowError extends Error {
    constructor() {
        super();
        this.name = "BufferOverflowError";
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super();
        this.name = "BufferEmptyError";
    }
}

export default class CircularBuffer<T> {
    private buf: T[];
    private indexWrite = 0;
    private indexRead = 0;
    private size: number;
    private count = 0;

    constructor(size: number) {
        this.buf = new Array<T>(size);
        this.size = size;
    }

    clear() {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.count = 0;
    }

    write(value: T) {
        if (this.count === this.size) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }

    read(): T {
        if (this.count === 0) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead];
        this.indexRead = (this.indexRead + 1) % this.size;
        this.count--;
        return value;
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return;
        }

        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;

        if (this.count === this.size) {
            this.indexRead = (this.indexRead + 1) % this.size;
        } else {
            this.count++;
        }
    }
}