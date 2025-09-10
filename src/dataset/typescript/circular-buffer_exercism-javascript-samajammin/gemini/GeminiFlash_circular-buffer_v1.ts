export default class CircularBuffer<T> {
  private buffer: T[];
  private head: number;
  private tail: number;
  private count: number;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.buffer = new Array<T>(capacity);
    this.capacity = capacity;
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  read(): T {
    if (this.isEmpty()) {
      throw BufferEmptyError;
    }

    const item = this.buffer[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return item;
  }

  write(item: T): void {
    if (this.isFull()) {
      throw BufferOverflowError;
    }

    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  forceWrite(item: T): void {
    if (this.isFull()) {
      this.head = (this.head + 1) % this.capacity;
    } else {
      this.count++;
    }

    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
  }


  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';