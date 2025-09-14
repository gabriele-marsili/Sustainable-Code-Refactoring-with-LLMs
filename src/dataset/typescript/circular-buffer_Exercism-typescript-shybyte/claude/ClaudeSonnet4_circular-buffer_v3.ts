export class BufferOverflowError extends Error {
    constructor() {
        super("Buffer overflow")
        this.name = "BufferOverflowError"
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super("Buffer empty")
        this.name = "BufferEmptyError"
    }
}

export default class CircularBuffer<T> {
    private buf: Array<T | undefined>
    private indexWrite = 0
    private indexRead = 0
    private readonly size: number

    constructor(size: number) {
        this.size = size
        this.buf = new Array(size)
    }

    clear() {
        this.buf.fill(undefined)
        this.indexWrite = 0
        this.indexRead = 0
    }

    write(value: T) {
        if (this.buf[this.indexWrite] !== undefined) {
            throw new BufferOverflowError()
        }
        this.forceWrite(value)
    }

    read() {
        const value = this.buf[this.indexRead]
        if (value === undefined) {
            throw new BufferEmptyError()
        }
        this.buf[this.indexRead] = undefined
        this.indexRead = (this.indexRead + 1) % this.size
        return value
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return
        }
        const oldValue = this.buf[this.indexWrite]
        this.buf[this.indexWrite] = value
        this.indexWrite = (this.indexWrite + 1) % this.size
        if (oldValue !== undefined) {
            this.indexRead = (this.indexRead + 1) % this.size
        }
    }
}