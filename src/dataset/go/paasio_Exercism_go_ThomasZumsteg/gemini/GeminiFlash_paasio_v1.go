package paasio

import (
	"io"
	"sync/atomic"
)

//TestVersion is the unit tests that this will pass
const TestVersion = 1

// counter counts the read/write accesses and bytes transferred.
type counter struct {
	iofunc func([]byte) (int, error)
	bytes  int64
	ops    int64
}

// newCounter creates a new counter.
func newCounter(iofunc func([]byte) (int, error)) *counter {
	return &counter{iofunc: iofunc}
}

// doIoFunc performs the I/O operation and updates the counters.
func (c *counter) doIoFunc(p []byte) (n int, err error) {
	n, err = c.iofunc(p)
	atomic.AddInt64(&c.bytes, int64(n))
	atomic.AddInt64(&c.ops, 1)
	return
}

// count returns the total bytes and number of operations.
func (c *counter) count() (int64, int) {
	bytes := atomic.LoadInt64(&c.bytes)
	ops := atomic.LoadInt64(&c.ops)
	return bytes, int(ops)
}

// readCounter counts read I/O operations.
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

// writeCounter counts write accesses and bytes transferred.
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