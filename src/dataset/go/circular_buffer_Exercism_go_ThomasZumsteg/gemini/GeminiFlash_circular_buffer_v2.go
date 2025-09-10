package circular

import "errors"

// TestVersion is the unit tests that pass.
const TestVersion = 2

// Buffer is a circular ring buffer.
type Buffer struct {
	read  int
	write int
	data  []byte
	size  int
}

/*NewBuffer creates a new ring buffer of a certain size.*/
func NewBuffer(size int) *Buffer {
	buff := &Buffer{
		read:  0,
		write: 0,
		data:  make([]byte, size),
		size:  size,
	}
	return buff
}

/*ReadByte reads the oldest byte in the buffer,
cant read an empty buffer.*/
func (b *Buffer) ReadByte() (byte, error) {
	if b.read == b.write && b.data[b.read] == 0 {
		return 0, errors.New("Buffer is empty")
	}

	val := b.data[b.read]
	b.read = (b.read + 1) % b.size

	// Mark the old value as zero to allow GC to reclaim memory if needed.
	// This is important if the buffer stores pointers or other complex types.
	// If the buffer stores only primitive types, this line can be removed for a slight performance gain.
	b.data[b.read-1] = 0 // Or b.data[(b.read + b.size -1) % b.size] = 0 if b.read is already 0

	return val, nil
}

/*WriteByte writes to the buffer and woun't write to a full buffer.*/
func (b *Buffer) WriteByte(c byte) error {
	nextWrite := (b.write + 1) % b.size
	if nextWrite == b.read && b.data[b.read] != 0 {
		return errors.New("Buffer is full")
	}

	b.data[b.write] = c
	b.write = nextWrite
	return nil
}

/*Overwrite writes to buffer even if it's full*/
func (b *Buffer) Overwrite(c byte) {
	if (b.write+1)%b.size == b.read && b.data[b.read] != 0 {
		b.read = (b.read + 1) % b.size
		b.data[b.read-1] = 0 // Or b.data[(b.read + b.size -1) % b.size] = 0 if b.read is already 0
	}
	b.data[b.write] = c
	b.write = (b.write + 1) % b.size
}

/*Reset clears the buffer of all data.*/
func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0
	// Optionally clear the underlying data slice if needed for security or memory management.
	// This can be expensive for large buffers, so consider the trade-offs.
	// for i := range b.data {
	// 	b.data[i] = 0
	// }
}