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

    constructor(size: number) {
        this.buf = new Array(size)
    }

    clear() {
        this.buf = new Array(this.buf.length)
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
        this.indexRead = this.getIncreasedWrappedIndex(this.indexRead)
        return value
    }

    forceWrite(value: T) {
        if (value === undefined || value === null) {
            return
        }
        const oldValue = this.buf[this.indexWrite]
        this.buf[this.indexWrite] = value
        this.indexWrite = this.getIncreasedWrappedIndex(this.indexWrite)
        if (oldValue !== undefined) {
            this.indexRead = this.getIncreasedWrappedIndex(this.indexRead)
        }
    }

    private getIncreasedWrappedIndex = (i: number) => (i + 1) % this.buf.length
}
