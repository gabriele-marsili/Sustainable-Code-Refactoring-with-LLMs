package paasio

import (
	"io"
	"sync"
)

// TestVersion is the unit tests that this will pass
const TestVersion = 1

// counter tracks the number of bytes and operations for an io function.
type counter struct {
	iofunc func([]byte) (int, error)
	mu     sync.Mutex
	bytes  int64
	ops    int
}

// newCounter creates a new counter to record io operations.
func newCounter(iofunc func([]byte) (int, error)) *counter {
	return &counter{iofunc: iofunc}
}

// doIoFunc performs the io function and stores the result.
func (c *counter) doIoFunc(p []byte) (n int, err error) {
	n, err = c.iofunc(p)
	c.mu.Lock()
	c.bytes += int64(n)
	c.ops++
	c.mu.Unlock()
	return
}

// count returns the total bytes and number of operations.
func (c *counter) count() (int64, int) {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.bytes, c.ops
}

// readCounter counts read io operations.
type readCounter struct{ *counter }

// NewReadCounter creates a new readCounter.
func NewReadCounter(source io.Reader) *readCounter {
	return &readCounter{newCounter(source.Read)}
}

// Read reads from the data source.
func (reader *readCounter) Read(p []byte) (n int, err error) {
	return reader.doIoFunc(p)
}

// ReadCount reports how many bytes and accesses have been read.
func (reader *readCounter) ReadCount() (int64, int) {
	return reader.count()
}

// writeCounter counts write io operations.
type writeCounter struct{ *counter }

// NewWriteCounter creates a new writeCounter.
func NewWriteCounter(source io.Writer) *writeCounter {
	return &writeCounter{newCounter(source.Write)}
}

// Write writes to the data source.
func (writer *writeCounter) Write(p []byte) (n int, err error) {
	return writer.doIoFunc(p)
}

// WriteCount reports how many bytes and accesses have been written.
func (writer *writeCounter) WriteCount() (int64, int) {
	return writer.count()
}