package circular

import "errors"

const TestVersion = 2

type Buffer struct {
	read, used, size int
	data             []byte
}

func NewBuffer(size int) *Buffer {
	return &Buffer{
		size: size,
		data: make([]byte, size),
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.used == 0 {
		return 0, errors.New("Buffer is empty")
	}
	read := b.data[b.read]
	b.read++
	if b.read == b.size {
		b.read = 0
	}
	b.used--
	return read, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.used == b.size {
		return errors.New("Buffer is full")
	}
	write := b.read + b.used
	if write >= b.size {
		write -= b.size
	}
	b.data[write] = c
	b.used++
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	if b.used == b.size {
		b.read++
		if b.read == b.size {
			b.read = 0
		}
	} else {
		b.used++
	}
	write := b.read + b.used - 1
	if write >= b.size {
		write -= b.size
	}
	b.data[write] = c
}

func (b *Buffer) Reset() {
	b.read = 0
	b.used = 0
}