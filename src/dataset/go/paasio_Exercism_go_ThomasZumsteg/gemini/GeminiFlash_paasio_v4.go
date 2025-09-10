package paasio

import (
	"io"
	"sync/atomic"
)

//TestVersion is the unit tests that this will pass
const TestVersion = 1

// counter counts the read/write accesses and how many bytes are transferred.
type counter struct {
	iofunc func([]byte) (int, error)
	bytes  int64
	ops    int64
}

// newCounter creates a new counter to record io operations.
func newCounter(iofunc func([]byte) (int, error)) *counter {
	return &counter{iofunc: iofunc}
}

// doIoFunc performs the io function and stores the result.
func (c *counter) doIoFunc(p []byte) (n int, err error) {
	n, err = c.iofunc(p)
	if n > 0 {
		atomic.AddInt64(&c.bytes, int64(n))
		atomic.AddInt64(&c.ops, 1)
	}
	return
}

// count counts the number of bytes and calls to the io operations.
func (c *counter) count() (int64, int) {
	bytes := atomic.LoadInt64(&c.bytes)
	ops := atomic.LoadInt64(&c.ops)
	return bytes, int(ops)
}

// readCounter counts read io operations.
type readCounter struct{ counter }

// NewReadCounter creates a new readCounter.
func NewReadCounter(source io.Reader) *readCounter {
	return &readCounter{*newCounter(source.Read)}
}

// Read reads from the data source.
func (reader *readCounter) Read(p []byte) (n int, err error) {
	return reader.counter.doIoFunc(p)
}

// ReadCount reports how many bytes and accesses have been read.
func (reader *readCounter) ReadCount() (int64, int) {
	return reader.counter.count()
}

// writeCounter counts write accesses and how many bytes are transferred.
type writeCounter struct{ counter }

// NewWriteCounter creates a new write writeCounter.
func NewWriteCounter(source io.Writer) *writeCounter {
	return &writeCounter{*newCounter(source.Write)}
}

// Write writes to the data source.
func (writer *writeCounter) Write(p []byte) (n int, err error) {
	return writer.counter.doIoFunc(p)
}

// WriteCount reports how many bytes and accesses have been written.
func (writer *writeCounter) WriteCount() (int64, int) {
	return writer.counter.count()
}