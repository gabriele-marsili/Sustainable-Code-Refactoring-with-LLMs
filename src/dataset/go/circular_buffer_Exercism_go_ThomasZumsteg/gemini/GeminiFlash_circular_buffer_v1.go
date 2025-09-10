package circular

import "errors"

// TestVersion is the unit tests that pass.
const TestVersion = 2

// Buffer is a circular ring buffer.
type Buffer struct {
	read  int
	write int
	size  int
	data  []byte
}

/*NewBuffer creates a new ring buffer of a certain size.*/
func NewBuffer(size int) *Buffer {
	buff := &Buffer{
		read:  0,
		write: 0,
		size:  size,
		data:  make([]byte, size),
	}
	return buff
}

/*ReadByte reads the oldest byte in the buffer,
cant read an empty buffer.*/
func (b *Buffer) ReadByte() (byte, error) {
	if b.read == b.write && b.data[b.read] == 0 {
		return 0, errors.New("Buffer is empty")
	}

	read := b.data[b.read]
	b.read = (b.read + 1) % b.size

	// Check if buffer is empty after read
	if b.read == b.write {
		b.data[b.read] = 0 // Reset the value to indicate empty buffer
	}

	return read, nil
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
	nextWrite := (b.write + 1) % b.size
	if nextWrite == b.read && b.data[b.read] != 0 {
		b.ReadByte()
	}
	b.WriteByte(c)
}

/*Reset clears the buffer of all data.*/
func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0

	// Reset the buffer data to zero
	for i := 0; i < b.size; i++ {
		b.data[i] = 0
	}
}