export default class CircularBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number;
  private tail: number;
  private size: number;

  constructor(length: number) {
    this.buffer = new Array<T | undefined>(length);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  isFull(): boolean {
    return this.size === this.buffer.length;
  }

  read(): T {
    if (this.size === 0) {
      throw BufferEmptyError;
    }
    const item = this.buffer[this.head]!;
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.buffer.length;
    this.size--;
    return item;
  }

  write(item: T): void {
    if (this.isFull()) {
      throw BufferOverflowError;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.buffer.length;
    this.size++;
  }

  forceWrite(item: T): void {
    if (this.isFull()) {
      this.head = (this.head + 1) % this.buffer.length;
      this.size--;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.buffer.length;
    this.size++;
  }

  clear(): void {
    this.buffer.fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';