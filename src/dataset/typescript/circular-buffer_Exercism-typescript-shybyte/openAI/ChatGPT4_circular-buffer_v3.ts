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
    private isFull = false;

    constructor(size: number) {
        this.buf = Array(size);
    }

    clear() {
        this.buf.fill(undefined);
        this.indexWrite = 0;
        this.indexRead = 0;
        this.isFull = false;
    }

    write(value: T) {
        if (this.isFull) {
            throw new BufferOverflowError();
        }
        this.forceWrite(value);
    }

    read() {
        if (!this.isReadable()) {
            throw new BufferEmptyError();
        }
        const value = this.buf[this.indexRead]!;
        this.buf[this.indexRead] = undefined;
        this.indexRead = this.getWrappedIndex(this.indexRead + 1);
        this.isFull = false;
        return value;
    }

    forceWrite(value: T) {
        if (value == null) return;
        this.buf[this.indexWrite] = value;
        this.indexWrite = this.getWrappedIndex(this.indexWrite + 1);
        if (this.isFull) {
            this.indexRead = this.getWrappedIndex(this.indexRead + 1);
        }
        this.isFull = this.indexWrite === this.indexRead;
    }

    private getWrappedIndex(i: number) {
        return i % this.buf.length;
    }

    private isReadable() {
        return this.indexWrite !== this.indexRead || this.isFull;
    }
}