package circular

import (
	"errors"
)

type Buffer struct {
	data        []byte
	size        int
	readIndex   int
	writeIndex  int
	isFull      bool
}

func NewBuffer(size int) *Buffer {
	if size <= 0 {
		panic("Buffer size must be greater than 0")
	}
	return &Buffer{
		data: make([]byte, size),
		size: size,
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if !b.isFull && b.readIndex == b.writeIndex {
		return 0, errors.New("buffer is empty")
	}
	val := b.data[b.readIndex]
	b.readIndex = (b.readIndex + 1) % b.size
	b.isFull = false
	return val, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.isFull {
		return errors.New("buffer is full")
	}
	b.data[b.writeIndex] = c
	b.writeIndex = (b.writeIndex + 1) % b.size
	b.isFull = b.writeIndex == b.readIndex
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.isFull {
		b.data[b.writeIndex] = c
		b.writeIndex = (b.writeIndex + 1) % b.size
		b.readIndex = b.writeIndex
	} else {
		_ = b.WriteByte(c)
	}
}

func (b *Buffer) Reset() {
	b.readIndex = 0
	b.writeIndex = 0
	b.isFull = false
}