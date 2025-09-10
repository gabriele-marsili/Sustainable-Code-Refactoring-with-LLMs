package circular

import "errors"

const TestVersion = 2

type Buffer struct {
	read, used int
	data       []byte
}

func NewBuffer(size int) *Buffer {
	return &Buffer{data: make([]byte, size)}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.used == 0 {
		return 0, errors.New("Buffer is empty")
	}
	read := b.data[b.read]
	b.read = (b.read + 1) % len(b.data)
	b.used--
	return read, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.used == len(b.data) {
		return errors.New("Buffer is full")
	}
	b.data[(b.read+b.used)%len(b.data)] = c
	b.used++
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.used == len(b.data) {
		b.data[b.read] = c
		b.read = (b.read + 1) % len(b.data)
	} else {
		b.WriteByte(c)
	}
}

func (b *Buffer) Reset() {
	b.read, b.used = 0, 0
}