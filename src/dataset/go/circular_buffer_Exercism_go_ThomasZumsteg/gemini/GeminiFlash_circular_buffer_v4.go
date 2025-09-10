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
	return &Buffer{
		read:  0,
		write: 0,
		data:  make([]byte, size),
		size:  size,
	}
}

/*ReadByte reads the oldest byte in the buffer,
cant read an empty buffer.*/
func (b *Buffer) ReadByte() (byte, error) {
	if b.read == b.write && b.data[b.read] == 0 {
		return 0, errors.New("Buffer is empty")
	}

	val := b.data[b.read]
	b.read = (b.read + 1) % b.size
	b.data[b.write] = 0 //zero out the data for garbage collection
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
	nextWrite := (b.write + 1) % b.size
	if nextWrite == b.read && b.data[b.read] != 0 {
		b.ReadByte()
	}
	b.data[b.write] = c
	b.write = (b.write + 1) % b.size
}

/*Reset clears the buffer of all data.*/
func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0
	for i := range b.data {
		b.data[i] = 0
	}
}