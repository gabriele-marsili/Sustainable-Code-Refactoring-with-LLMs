package paasio

import (
	"io"
	"sync"
)

const TestVersion = 1

type counter struct {
	iofunc    func([]byte) (int, error)
	bytesRead int64
	callCount int
	mu        sync.RWMutex
}

func newCounter(iofunc func([]byte) (int, error)) *counter {
	return &counter{iofunc: iofunc}
}

func (c *counter) doIoFunc(p []byte) (n int, err error) {
	n, err = c.iofunc(p)
	c.mu.Lock()
	c.bytesRead += int64(n)
	c.callCount++
	c.mu.Unlock()
	return
}

func (c *counter) count() (int64, int) {
	c.mu.RLock()
	bytes := c.bytesRead
	calls := c.callCount
	c.mu.RUnlock()
	return bytes, calls
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