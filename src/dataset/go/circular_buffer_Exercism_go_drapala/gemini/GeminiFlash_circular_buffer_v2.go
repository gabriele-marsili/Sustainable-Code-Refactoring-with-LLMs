package circular

import "errors"

// Buffer represents a circular buffer.
type Buffer struct {
	data   []byte
	head   int
	tail   int
	size   int
	length int
}

// NewBuffer creates a new circular buffer with the given size.
func NewBuffer(size int) *Buffer {
	return &Buffer{
		data: make([]byte, size),
		size: size,
	}
}

// ReadByte reads a byte from the buffer.
func (b *Buffer) ReadByte() (byte, error) {
	if b.length == 0 {
		return 0, errors.New("circular buffer is empty")
	}

	c := b.data[b.head]
	b.head = (b.head + 1) % b.size
	b.length--
	return c, nil
}

// WriteByte writes a byte to the buffer.
func (b *Buffer) WriteByte(c byte) error {
	if b.length == b.size {
		return errors.New("circular buffer is full")
	}

	b.data[b.tail] = c
	b.tail = (b.tail + 1) % b.size
	b.length++
	return nil
}

// Overwrite overwrites the oldest byte in the buffer with the given byte.
func (b *Buffer) Overwrite(c byte) {
	if b.length == b.size {
		b.head = (b.head + 1) % b.size
		b.length--
	}
	b.data[b.tail] = c
	b.tail = (b.tail + 1) % b.size
	b.length++
}

// Reset resets the buffer to its initial state.
func (b *Buffer) Reset() {
	b.head = 0
	b.tail = 0
	b.length = 0
}