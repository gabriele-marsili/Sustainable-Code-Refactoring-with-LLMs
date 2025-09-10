export default class CircularBuffer<T> {
  private buffer: T[];
  private head: number;
  private tail: number;
  private count: number;
  private readonly capacity: number;

  constructor(length: number) {
    this.capacity = length;
    this.buffer = new Array<T>(length);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  read(): T {
    if (this.count === 0) {
      throw BufferEmptyError;
    }
    const item = this.buffer[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return item!;
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
      this.count--;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';