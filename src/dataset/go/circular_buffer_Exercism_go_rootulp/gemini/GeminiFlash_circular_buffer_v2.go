package circular

import "fmt"

// Buffer implements a circular buffer of bytes supporting both overflow-checked writes
// and unconditional, possibly overwriting, writes.
//
// It implements io.ByteReader and io.ByteWriter.
type Buffer struct {
	capacity    int
	store       []byte
	length      int
	insertIndex int
	readIndex   int
}

func NewBuffer(capacity int) *Buffer {
	return &Buffer{
		capacity: capacity,
		store:    make([]byte, capacity),
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.length == 0 {
		return 0, fmt.Errorf("error reading from empty buffer")
	}
	result := b.store[b.readIndex]
	b.readIndex = (b.readIndex + 1) % b.capacity
	b.length--
	return result, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.length == b.capacity {
		return fmt.Errorf("error writing to full buffer")
	}
	b.store[b.insertIndex] = c
	b.insertIndex = (b.insertIndex + 1) % b.capacity
	b.length++
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.length == b.capacity {
		b.readIndex = (b.readIndex + 1) % b.capacity
	} else {
		b.length++
	}
	b.store[b.insertIndex] = c
	b.insertIndex = (b.insertIndex + 1) % b.capacity
}

func (b *Buffer) Reset() {
	b.length = 0
	b.insertIndex = 0
	b.readIndex = 0
}