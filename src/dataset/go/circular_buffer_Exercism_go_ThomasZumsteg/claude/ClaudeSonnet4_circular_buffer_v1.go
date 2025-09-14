package circular

import "errors"

//TestVersion is the unit tests that pass.
const TestVersion = 2

var (
	errBufferEmpty = errors.New("Buffer is empty")
	errBufferFull  = errors.New("Buffer is full")
)

//Buffer is a circular ring buffer.
type Buffer struct {
	read, used, size int
	data             []byte
}

/*NewBuffer creates a new ring buffer of a certain size.*/
func NewBuffer(size int) *Buffer {
	return &Buffer{
		size: size,
		data: make([]byte, size),
	}
}

/*ReadByte reads the oldest byte in the buffer,
cant read an empty buffer.*/
func (b *Buffer) ReadByte() (byte, error) {
	if b.used == 0 {
		return 0, errBufferEmpty
	}
	read := b.data[b.read]
	b.read++
	if b.read == b.size {
		b.read = 0
	}
	b.used--
	return read, nil
}

/*WriteByte writes to the buffer and woun't write to a full buffer.*/
func (b *Buffer) WriteByte(c byte) error {
	if b.used == b.size {
		return errBufferFull
	}
	write := b.read + b.used
	if write >= b.size {
		write -= b.size
	}
	b.data[write] = c
	b.used++
	return nil
}

/*Overwrite writes to buffer even if it's full*/
func (b *Buffer) Overwrite(c byte) {
	if b.used == b.size {
		write := b.read
		b.data[write] = c
		b.read++
		if b.read == b.size {
			b.read = 0
		}
	} else {
		write := b.read + b.used
		if write >= b.size {
			write -= b.size
		}
		b.data[write] = c
		b.used++
	}
}

/*Reset clears the buffer of all data.*/
func (b *Buffer) Reset() {
	b.used = 0
	b.read = 0
}