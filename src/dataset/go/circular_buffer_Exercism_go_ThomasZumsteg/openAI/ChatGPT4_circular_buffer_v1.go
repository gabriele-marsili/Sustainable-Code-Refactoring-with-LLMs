package circular

import "errors"

// TestVersion is the unit tests that pass.
const TestVersion = 2

// Buffer is a circular ring buffer.
type Buffer struct {
	read, used int
	data       []byte
}

// NewBuffer creates a new ring buffer of a certain size.
func NewBuffer(size int) *Buffer {
	return &Buffer{data: make([]byte, size)}
}

// ReadByte reads the oldest byte in the buffer, can't read an empty buffer.
func (b *Buffer) ReadByte() (byte, error) {
	if b.used == 0 {
		return 0, errors.New("buffer is empty")
	}
	read := b.data[b.read]
	b.read = (b.read + 1) % len(b.data)
	b.used--
	return read, nil
}

// WriteByte writes to the buffer and won't write to a full buffer.
func (b *Buffer) WriteByte(c byte) error {
	if b.used == len(b.data) {
		return errors.New("buffer is full")
	}
	b.data[(b.read+b.used)%len(b.data)] = c
	b.used++
	return nil
}

// Overwrite writes to buffer even if it's full.
func (b *Buffer) Overwrite(c byte) {
	if b.used == len(b.data) {
		b.data[b.read] = c
		b.read = (b.read + 1) % len(b.data)
	} else {
		b.data[(b.read+b.used)%len(b.data)] = c
		b.used++
	}
}

// Reset clears the buffer of all data.
func (b *Buffer) Reset() {
	b.read, b.used = 0, 0
}