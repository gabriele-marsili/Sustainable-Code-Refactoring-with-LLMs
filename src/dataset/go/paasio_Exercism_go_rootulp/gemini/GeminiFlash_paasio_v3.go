package paasio

import (
	"io"
	"sync/atomic"
)

// === ReadCounter ===

type readCounter struct {
	reader         io.Reader
	totalBytesRead int64
	numReads       int64
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{
		reader: reader,
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	bytesRead, err := rc.reader.Read(p)
	if err != nil {
		return bytesRead, err
	}

	atomic.AddInt64(&rc.totalBytesRead, int64(bytesRead))
	atomic.AddInt64(&rc.numReads, 1)

	return bytesRead, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	total := atomic.LoadInt64(&rc.totalBytesRead)
	num := atomic.LoadInt64(&rc.numReads)
	return total, int(num)
}

// === WriteCounter ===

type writeCounter struct {
	writer            io.Writer
	totalBytesWritten int64
	numWrites         int64
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{
		writer: writer,
	}
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	written, err := wc.writer.Write(p)
	if err != nil {
		return written, err
	}

	atomic.AddInt64(&wc.totalBytesWritten, int64(written))
	atomic.AddInt64(&wc.numWrites, 1)

	return written, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	total := atomic.LoadInt64(&wc.totalBytesWritten)
	num := atomic.LoadInt64(&wc.numWrites)
	return total, int(num)
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