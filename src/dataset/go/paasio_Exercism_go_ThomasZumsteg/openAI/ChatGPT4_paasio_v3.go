package paasio

import (
	"io"
	"sync"
)

const TestVersion = 1

type counter struct {
	iofunc func([]byte) (int, error)
	mu     sync.Mutex
	bytes  int64
	calls  int
}

func newCounter(iofunc func([]byte) (int, error)) *counter {
	return &counter{iofunc: iofunc}
}

func (c *counter) doIoFunc(p []byte) (n int, err error) {
	n, err = c.iofunc(p)
	c.mu.Lock()
	c.bytes += int64(n)
	c.calls++
	c.mu.Unlock()
	return
}

func (c *counter) count() (int64, int) {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.bytes, c.calls
}

type readCounter struct{ counter }

func NewReadCounter(source io.Reader) *readCounter {
	return &readCounter{*newCounter(source.Read)}
}

func (reader *readCounter) Read(p []byte) (n int, err error) {
	return reader.doIoFunc(p)
}

func (reader *readCounter) ReadCount() (int64, int) {
	return reader.count()
}

type writeCounter struct{ counter }

func NewWriteCounter(source io.Writer) *writeCounter {
	return &writeCounter{*newCounter(source.Write)}
}

func (writer *writeCounter) Write(p []byte) (n int, err error) {
	return writer.doIoFunc(p)
}

func (writer *writeCounter) WriteCount() (int64, int) {
	return writer.count()
}