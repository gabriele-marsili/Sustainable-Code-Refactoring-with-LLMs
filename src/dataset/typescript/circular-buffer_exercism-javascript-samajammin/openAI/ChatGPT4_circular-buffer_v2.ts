export default class CircularBuffer<T> {
  private buffer: (T | null)[];
  private head: number;
  private tail: number;
  private size: number;

  constructor(private readonly capacity: number) {
    this.buffer = new Array<T | null>(capacity).fill(null);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  read(): T {
    if (this.size === 0) {
      throw BufferEmptyError;
    }
    const item = this.buffer[this.head]!;
    this.buffer[this.head] = null; // Clear reference for GC
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return item;
  }

  write(item: T): void {
    if (this.isFull()) {
      throw BufferOverflowError;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  forceWrite(item: T): void {
    if (this.isFull()) {
      this.head = (this.head + 1) % this.capacity;
      this.size--;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  clear(): void {
    this.buffer.fill(null); // Clear all references for GC
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';