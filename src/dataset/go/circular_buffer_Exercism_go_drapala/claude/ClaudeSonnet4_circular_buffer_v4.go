package circular

import "io"

type Buffer struct {
	data   []byte
	read   int
	write  int
	size   int
	full   bool
}

func NewBuffer(size int) *Buffer {
	return &Buffer{
		data: make([]byte, size),
		size: size,
	}
}

func (b *Buffer) ReadByte() (byte, error) {
	if b.read == b.write && !b.full {
		return 0, io.EOF
	}
	
	c := b.data[b.read]
	b.read = (b.read + 1) % b.size
	b.full = false
	return c, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.full {
		return io.ErrShortBuffer
	}
	
	b.data[b.write] = c
	b.write = (b.write + 1) % b.size
	b.full = b.write == b.read
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	b.data[b.write] = c
	b.write = (b.write + 1) % b.size
	
	if b.full {
		b.read = (b.read + 1) % b.size
	} else {
		b.full = b.write == b.read
	}
}

func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0
	b.full = false
}