package circular

import "io"

// Buffer implements a circular buffer of bytes supporting both overflow-checked writes
// and unconditional, possibly overwriting, writes.
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
	if !b.full && b.read == b.write {
		return 0, io.EOF
	}
	
	c := b.data[b.read]
	b.read++
	if b.read == b.size {
		b.read = 0
	}
	b.full = false
	
	return c, nil
}

func (b *Buffer) WriteByte(c byte) error {
	if b.full {
		return io.ErrShortBuffer
	}
	
	b.data[b.write] = c
	b.write++
	if b.write == b.size {
		b.write = 0
	}
	
	if b.write == b.read {
		b.full = true
	}
	
	return nil
}

func (b *Buffer) Overwrite(c byte) {
	b.data[b.write] = c
	b.write++
	if b.write == b.size {
		b.write = 0
	}
	
	if b.full {
		b.read++
		if b.read == b.size {
			b.read = 0
		}
	} else if b.write == b.read {
		b.full = true
	}
}

func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0
	b.full = false
}