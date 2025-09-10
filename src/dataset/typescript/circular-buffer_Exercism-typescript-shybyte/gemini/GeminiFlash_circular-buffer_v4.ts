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
    private isFull = false;

    constructor(size: number) {
        this.buf = new Array<T>(size);
        this.size = size;
    }

    clear() {
        this.indexWrite = 0;
        this.indexRead = 0;
        this.isFull = false;
        this.buf.fill(undefined as any);
    }

    write(value: T) {
        if (this.isFull) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }

    read(): T {
        if (this.indexRead === this.indexWrite && !this.isFull) {
            throw new BufferEmptyError();
        }

        const value = this.buf[this.indexRead];
        const readIndex = this.indexRead;
        this.indexRead = (this.indexRead + 1) % this.size;
        if (this.isFull) {
            this.isFull = false;
        }
        if (value === undefined) {
            throw new BufferEmptyError();
        }
        return value;
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return;
        }

        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.size;

        if (this.isFull === false && this.indexWrite === this.indexRead) {
            this.isFull = true;
        }
        if (this.isFull) {
            this.indexRead = (this.indexRead + 1) % this.size;
        }
    }
}