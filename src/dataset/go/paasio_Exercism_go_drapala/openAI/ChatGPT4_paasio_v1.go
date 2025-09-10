package paasio

import (
	"io"
	"sync"
)

type readCounter struct {
	reader    io.Reader
	bytesRead int64
	ops       int
	mu        sync.Mutex
}

type writeCounter struct {
	writer      io.Writer
	bytesWritten int64
	ops         int
	mu          sync.Mutex
}

type readWriteCounter struct {
	readCounter
	writeCounter
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{writer: writer}
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{reader: reader}
}

func NewReadWriteCounter(readwriter io.ReadWriter) ReadWriteCounter {
	return &readWriteCounter{
		readCounter:  readCounter{reader: readwriter},
		writeCounter: writeCounter{writer: readwriter},
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	rc.mu.Lock()
	rc.bytesRead += int64(n)
	rc.ops++
	rc.mu.Unlock()
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	rc.mu.Lock()
	defer rc.mu.Unlock()
	return rc.bytesRead, rc.ops
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	wc.mu.Lock()
	wc.bytesWritten += int64(n)
	wc.ops++
	wc.mu.Unlock()
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	wc.mu.Lock()
	defer wc.mu.Unlock()
	return wc.bytesWritten, wc.ops
}