package circular

import "errors"

// Buffer implements a circular buffer of bytes.
type Buffer struct {
	data   []byte
	head   int
	tail   int
	size   int
	length int
}

// NewBuffer creates a new circular buffer with the given size.
func NewBuffer(size int) *Buffer {
	if size <= 0 {
		return &Buffer{
			data:   []byte{},
			head:   0,
			tail:   0,
			size:   0,
			length: 0,
		}
	}
	return &Buffer{
		data:   make([]byte, size),
		head:   0,
		tail:   0,
		size:   size,
		length: 0,
	}
}

// ReadByte reads and returns the next byte from the buffer.
// It returns an error if the buffer is empty.
func (b *Buffer) ReadByte() (byte, error) {
	if b.length == 0 {
		return 0, errors.New("buffer is empty")
	}
	c := b.data[b.head]
	b.head = (b.head + 1) % b.size
	b.length--
	return c, nil
}

// WriteByte writes a byte to the buffer.
// It returns an error if the buffer is full.
func (b *Buffer) WriteByte(c byte) error {
	if b.length == b.size {
		return errors.New("buffer is full")
	}
	b.data[b.tail] = c
	b.tail = (b.tail + 1) % b.size
	b.length++
	return nil
}

// Overwrite writes a byte to the buffer, overwriting the oldest byte if the buffer is full.
func (b *Buffer) Overwrite(c byte) {
	if b.size == 0 {
		return
	}
	b.data[b.tail] = c
	b.tail = (b.tail + 1) % b.size
	if b.length == b.size {
		b.head = (b.head + 1) % b.size
	} else {
		b.length++
	}
}

// Reset resets the buffer to be empty.
func (b *Buffer) Reset() {
	b.head = 0
	b.tail = 0
	b.length = 0
}