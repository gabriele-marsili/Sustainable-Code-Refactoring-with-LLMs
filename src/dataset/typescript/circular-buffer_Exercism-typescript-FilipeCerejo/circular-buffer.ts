export default class CircularBuffer<T> {
    private _pointer: number;
    private _buffer: (T | null)[];

    constructor(initial: number) {
        this._buffer = Array.from({ length: initial }, () => null);
        this._pointer = 0;
    }

    private movePointer(): void {
        this._pointer = this._pointer + 1 === this._buffer.length ? 0 : this._pointer + 1;
    }

    private moveTillAvailable(): void {
        for (let i = 0; i < this._buffer.length; i++) {
            if (this._buffer[this._pointer]) {
                this.movePointer();
            } else {
                return;
            }
        }
        throw new BufferFullError();
    }

    private moveTillUsed(): void {
        for (let i = 0; i < this._buffer.length; i++) {
            if (this._buffer[this._pointer]) {
                return;
            } else {
                this.movePointer();
            }
        }
        throw new BufferEmptyError();
    }

    write(value: T): void {
        this.moveTillAvailable();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    read(): T {
        this.moveTillUsed();
        let info = this._buffer[this._pointer];
        this._buffer[this._pointer] = null;
        this.movePointer();
        return info!;
    }

    forceWrite(value: T): void {
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    clear(): void {
        this._buffer = Array.from({ length: this._buffer.length }, () => null);
    }
}

export class BufferFullError extends Error {
    constructor() {
        super();
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super();
    }
}
