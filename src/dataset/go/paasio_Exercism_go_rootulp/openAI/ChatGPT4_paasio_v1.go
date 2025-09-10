package paasio

import (
	"io"
	"sync"
)

// === ReadCounter ===

type readCounter struct {
	reader         io.Reader
	totalBytesRead int64
	numReads       int
	mutex          sync.Mutex
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{
		reader: reader,
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	bytesRead, err := rc.reader.Read(p)
	rc.mutex.Lock()
	rc.totalBytesRead += int64(bytesRead)
	rc.numReads++
	rc.mutex.Unlock()
	return bytesRead, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	rc.mutex.Lock()
	defer rc.mutex.Unlock()
	return rc.totalBytesRead, rc.numReads
}

// === WriteCounter ===

type writeCounter struct {
	writer            io.Writer
	totalBytesWritten int64
	numWrites         int
	mutex             sync.Mutex
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{
		writer: writer,
	}
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	written, err := wc.writer.Write(p)
	wc.mutex.Lock()
	wc.totalBytesWritten += int64(written)
	wc.numWrites++
	wc.mutex.Unlock()
	return written, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	wc.mutex.Lock()
	defer wc.mutex.Unlock()
	return wc.totalBytesWritten, wc.numWrites
}

// === ReadWriteCounter ===

type readWriteCounter struct {
	ReadCounter
	WriteCounter
}

func NewReadWriteCounter(readwriter io.ReadWriter) ReadWriteCounter {
	return &readWriteCounter{
		NewReadCounter(readwriter),
		NewWriteCounter(readwriter),
	}
}