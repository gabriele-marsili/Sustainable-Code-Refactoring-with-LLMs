export default class CircularBuffer<T> {
  private buffer: T[];
  private readonly capacity: number;
  private head: number;
  private tail: number;
  private size: number;

  constructor(capacity: number) {
    this.buffer = new Array<T>(capacity);
    this.capacity = capacity;
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  read(): T {
    if (this.isEmpty()) {
      throw BufferEmptyError;
    }

    const value = this.buffer[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return value;
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
    } else {
      this.size++;
    }

    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
  }


  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
}

export const BufferOverflowError = 'Buffer overflowed';
export const BufferEmptyError = 'Buffer is empty';