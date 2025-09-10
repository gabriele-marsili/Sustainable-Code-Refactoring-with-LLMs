package circular

import (
	"errors"
	"io"
)

// Buffer represents a circular buffer of bytes.
type Buffer struct {
	data        []byte
	size        int
	readIndex   int
	writeIndex  int
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
	if !b.isFull && b.readIndex == b.writeIndex {
		return 0, io.EOF
	}
	val := b.data[b.readIndex]
	b.readIndex = (b.readIndex + 1) % b.size
	b.isFull = false
	return val, nil
}

// WriteByte writes a byte to the buffer. Returns an error if the buffer is full.
func (b *Buffer) WriteByte(c byte) error {
	if b.isFull {
		return errors.New("buffer is full")
	}
	b.data[b.writeIndex] = c
	b.writeIndex = (b.writeIndex + 1) % b.size
	if b.writeIndex == b.readIndex {
		b.isFull = true
	}
	return nil
}

// Overwrite writes a byte to the buffer, overwriting the oldest byte if the buffer is full.
func (b *Buffer) Overwrite(c byte) {
	if b.isFull {
		b.data[b.writeIndex] = c
		b.writeIndex = (b.writeIndex + 1) % b.size
		b.readIndex = (b.readIndex + 1) % b.size
	} else {
		_ = b.WriteByte(c) // Safe to ignore error since buffer isn't full
	}
}

// Reset clears the buffer, making it empty.
func (b *Buffer) Reset() {
	b.readIndex = 0
	b.writeIndex = 0
	b.isFull = false
}