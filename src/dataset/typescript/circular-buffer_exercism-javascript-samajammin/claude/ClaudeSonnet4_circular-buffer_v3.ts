export default class CircularBuffer<T> {
  private buffer: T[];
  private head: number = 0;
  private tail: number = 0;
  private size: number = 0;
  readonly length: number;

  constructor(length: number) {
    this.buffer = new Array<T>(length);
    this.length = length;
  }

  isFull(): boolean {
    return this.size === this.length;
  }

  read(): T {
    if (this.size === 0) {
      throw BufferEmptyError;
    }
    const item = this.buffer[this.head];
    this.head = (this.head + 1) % this.length;
    this.size--;
    return item;
  }

  write(item: T): void {
    if (this.size === this.length) {
      throw BufferOverflowError;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.length;
    this.size++;
  }

  forceWrite(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.length;
    if (this.size === this.length) {
      this.head = (this.head + 1) % this.length;
    } else {
      this.size++;
    }
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';