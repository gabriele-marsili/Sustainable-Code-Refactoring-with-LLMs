package circular

import "errors"

//TestVersion is the unit tests that pass.
const TestVersion = 2

//Buffer is a circular ring buffer.
type Buffer struct {
	read, write, size int
	data              []byte
}

/*NewBuffer creates a new ring buffer of a certain size.*/
func NewBuffer(size int) *Buffer {
	return &Buffer{
		data: make([]byte, size),
		size: size,
	}
}

/*ReadByte reads the oldest byte in the buffer,
cant read an empty buffer.*/
func (b *Buffer) ReadByte() (byte, error) {
	if b.read == b.write {
		return 0, errors.New("Buffer is empty")
	}
	read := b.data[b.read]
	b.read++
	if b.read == b.size {
		b.read = 0
	}
	return read, nil
}

/*WriteByte writes to the buffer and woun't write to a full buffer.*/
func (b *Buffer) WriteByte(c byte) error {
	nextWrite := b.write + 1
	if nextWrite == b.size {
		nextWrite = 0
	}
	if nextWrite == b.read {
		return errors.New("Buffer is full")
	}
	b.data[b.write] = c
	b.write = nextWrite
	return nil
}

/*Overwrite writes to buffer even if it's full*/
func (b *Buffer) Overwrite(c byte) {
	nextWrite := b.write + 1
	if nextWrite == b.size {
		nextWrite = 0
	}
	if nextWrite == b.read {
		b.read++
		if b.read == b.size {
			b.read = 0
		}
	}
	b.data[b.write] = c
	b.write = nextWrite
}

/*Reset clears the buffer of all data.*/
func (b *Buffer) Reset() {
	b.read = 0
	b.write = 0
}