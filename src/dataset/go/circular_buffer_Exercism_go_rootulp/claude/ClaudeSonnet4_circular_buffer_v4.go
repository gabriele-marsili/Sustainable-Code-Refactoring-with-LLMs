package circular

import "errors"

type Buffer struct {
	capacity    int
	store       []byte
	length      int
	insertIndex int
	readIndex   int
}

var (
	errEmptyBuffer = errors.New("error reading from empty buffer")
	errFullBuffer  = errors.New("error writing to full buffer")
)

func NewBuffer(capacity int) *Buffer {
	return &Buffer{
		capacity: capacity,
		store:    make([]byte, capacity),
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.length == 0 {
		return 0, errEmptyBuffer
	}
	result := b.store[b.readIndex]
	b.store[b.readIndex] = 0
	b.readIndex++
	if b.readIndex == b.capacity {
		b.readIndex = 0
	}
	b.length--
	return result, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.length == b.capacity {
		return errFullBuffer
	}
	b.store[b.insertIndex] = c
	b.insertIndex++
	if b.insertIndex == b.capacity {
		b.insertIndex = 0
	}
	b.length++
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.store[b.insertIndex] == 0 {
		b.length++
	} else {
		b.readIndex++
		if b.readIndex == b.capacity {
			b.readIndex = 0
		}
	}
	b.store[b.insertIndex] = c
	b.insertIndex++
	if b.insertIndex == b.capacity {
		b.insertIndex = 0
	}
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

func nextIndex(current int, capacity int) int {
	if current == capacity-1 {
		return 0
	}
	return current + 1
}