package circular

import (
	"errors"
	"io"
)

type Buffer struct {
	data        []byte
	size        int
	start, end  int
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
	if b.start == b.end && !b.isFull {
		return 0, io.EOF
	}
	val := b.data[b.start]
	b.start = (b.start + 1) % b.size
	b.isFull = false
	return val, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.isFull {
		return errors.New("buffer is full")
	}
	b.data[b.end] = c
	b.end = (b.end + 1) % b.size
	b.isFull = b.start == b.end
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.isFull {
		b.start = (b.start + 1) % b.size
	}
	b.data[b.end] = c
	b.end = (b.end + 1) % b.size
	b.isFull = b.start == b.end
}

func (b *Buffer) Reset() {
	b.start, b.end = 0, 0
	b.isFull = false
}