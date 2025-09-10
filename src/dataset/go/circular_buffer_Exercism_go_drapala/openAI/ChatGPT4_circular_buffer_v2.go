package circular

import (
	"errors"
	"io"
)

// Buffer represents a circular buffer of bytes.
type Buffer struct {
	data        []byte
	size        int
	start, end  int
	isFull      bool
}

// NewBuffer creates a new circular buffer with the given size.
func NewBuffer(size int) *Buffer {
	if size <= 0 {
		panic("size must be greater than 0")
	}
	return &Buffer{
		data: make([]byte, size),
		size: size,
	}
}

// ReadByte reads and removes the oldest byte from the buffer.
func (b *Buffer) ReadByte() (byte, error) {
	if b.start == b.end && !b.isFull {
		return 0, io.EOF
	}
	val := b.data[b.start]
	b.start = (b.start + 1) % b.size
	b.isFull = false
	return val, nil
}

// WriteByte writes a byte to the buffer, returning an error if the buffer is full.
func (b *Buffer) WriteByte(c byte) error {
	if b.isFull {
		return errors.New("buffer is full")
	}
	b.data[b.end] = c
	b.end = (b.end + 1) % b.size
	if b.end == b.start {
		b.isFull = true
	}
	return nil
}

// Overwrite writes a byte to the buffer, overwriting the oldest byte if the buffer is full.
func (b *Buffer) Overwrite(c byte) {
	if b.isFull {
		b.start = (b.start + 1) % b.size
	}
	b.data[b.end] = c
	b.end = (b.end + 1) % b.size
	b.isFull = b.end == b.start
}

// Reset clears the buffer.
func (b *Buffer) Reset() {
	b.start = 0
	b.end = 0
	b.isFull = false
}