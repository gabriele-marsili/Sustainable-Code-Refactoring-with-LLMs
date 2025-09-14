export class BufferOverflowError extends Error{
    constructor() {
        super()
    }
}

export class BufferEmptyError extends Error{
    constructor() {
        super()
    }
}

export default class CircularBuffer<T> {
    private buf: Array<T | undefined>
    private indexWrite = 0
    private indexRead = 0
    private size: number
    private count = 0

    constructor(size: number) {
        this.size = size
        this.buf = new Array(size)
    }

    clear() {
        this.buf.fill(undefined)
        this.indexWrite = 0
        this.indexRead = 0
        this.count = 0
    }

    write(value: T) {
        if (this.count === this.size) {
            throw new BufferOverflowError()
        }
        this.forceWrite(value)
    }

    read() {
        if (this.count === 0) {
            throw new BufferEmptyError()
        }
        const value = this.buf[this.indexRead]!
        this.buf[this.indexRead] = undefined
        this.indexRead = (this.indexRead + 1) % this.size
        this.count--
        return value
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return
        }
        const wasEmpty = this.buf[this.indexWrite] === undefined
        this.buf[this.indexWrite] = value
        this.indexWrite = (this.indexWrite + 1) % this.size
        if (wasEmpty) {
            this.count++
        } else {
            this.indexRead = (this.indexRead + 1) % this.size
        }
    }
}