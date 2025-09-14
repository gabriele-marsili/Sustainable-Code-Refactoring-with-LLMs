package circular

import "errors"

// Implement a circular buffer of bytes supporting both overflow-checked writes
// and unconditional, possibly overwriting, writes.
//
// We chose the provided API so that Buffer implements io.ByteReader
// and io.ByteWriter and can be used (size permitting) as a drop in
// replacement for anything using that interface.

// Define the Buffer type here.
type Buffer struct {
	capacity    int
	store       []byte
	length      int // tracks the number of units in the buffer
	insertIndex int
	readIndex   int
}

var (
	errReadEmpty = errors.New("error reading from empty buffer")
	errWriteFull = errors.New("error writing to full buffer")
)

func NewBuffer(capacity int) *Buffer {
	return &Buffer{
		capacity: capacity,
		store:    make([]byte, capacity),
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.length == 0 {
		return 0, errReadEmpty
	}
	result := b.store[b.readIndex]
	b.readIndex = (b.readIndex + 1) % b.capacity
	b.length--
	return result, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.length == b.capacity {
		return errWriteFull
	}
	b.store[b.insertIndex] = c
	b.insertIndex = (b.insertIndex + 1) % b.capacity
	b.length++
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.length < b.capacity {
		b.length++
	} else {
		b.readIndex = (b.readIndex + 1) % b.capacity
	}
	b.store[b.insertIndex] = c
	b.insertIndex = (b.insertIndex + 1) % b.capacity
}

func (b *Buffer) Reset() {
	for i := range b.store {
		b.store[i] = 0
	}
	b.length = 0
	b.insertIndex = 0
	b.readIndex = 0
}

func (b *Buffer) len() int {
	return b.length
}