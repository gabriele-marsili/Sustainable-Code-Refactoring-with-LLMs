export default class CircularBuffer<T> {
    private _pointer: number;
    private _buffer: (T | null)[];
    private _size: number;

    constructor(initial: number) {
        this._size = initial;
        this._buffer = new Array(initial);
        this._buffer.fill(null);
        this._pointer = 0;
    }

    private movePointer(): void {
        this._pointer = (this._pointer + 1) % this._size;
    }

    private moveTillAvailable(): void {
        const startPointer = this._pointer;
        do {
            if (this._buffer[this._pointer] === null) {
                return;
            }
            this.movePointer();
        } while (this._pointer !== startPointer);
        
        throw new BufferFullError();
    }

    private moveTillUsed(): void {
        const startPointer = this._pointer;
        do {
            if (this._buffer[this._pointer] !== null) {
                return;
            }
            this.movePointer();
        } while (this._pointer !== startPointer);
        
        throw new BufferEmptyError();
    }

    write(value: T): void {
        this.moveTillAvailable();
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    read(): T {
        this.moveTillUsed();
        const info = this._buffer[this._pointer]!;
        this._buffer[this._pointer] = null;
        this.movePointer();
        return info;
    }

    forceWrite(value: T): void {
        this._buffer[this._pointer] = value;
        this.movePointer();
    }

    clear(): void {
        this._buffer.fill(null);
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