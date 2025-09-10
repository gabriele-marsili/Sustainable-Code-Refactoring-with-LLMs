export class BufferOverflowError extends Error {
    constructor() {
        super("Buffer overflow");
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super("Buffer is empty");
    }
}

export default class CircularBuffer<T> {
    private buf: (T | undefined)[];
    private indexWrite = 0;
    private indexRead = 0;
    private count = 0;

    constructor(size: number) {
        if (size <= 0) {
            throw new Error("Buffer size must be greater than 0");
        }
        this.buf = new Array(size);
    }

    clear() {
        this.buf.fill(undefined);
        this.indexWrite = 0;
        this.indexRead = 0;
        this.count = 0;
    }

    write(value: T) {
        if (this.count === this.buf.length) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }

    read() {
        if (this.count === 0) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead]!;
        this.buf[this.indexRead] = undefined;
        this.indexRead = (this.indexRead + 1) % this.buf.length;
        this.count--;
        return value;
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return;
        }
        if (this.count === this.buf.length) {
            this.indexRead = (this.indexRead + 1) % this.buf.length;
        } else {
            this.count++;
        }
        this.buf[this.indexWrite] = value;
        this.indexWrite = (this.indexWrite + 1) % this.buf.length;
    }
}