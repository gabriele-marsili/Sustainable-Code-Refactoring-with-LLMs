package paasio

import (
	"io"
	"sync/atomic"
)

// === ReadCounter ===

type readCounter struct {
	reader         io.Reader
	totalBytesRead atomic.Int64
	numReads       atomic.Int64
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{
		reader: reader,
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	bytesRead, err := rc.reader.Read(p)
	if err != nil {
		return bytesRead, err // Corrected: return bytesRead even if error
	}

	rc.totalBytesRead.Add(int64(bytesRead))
	rc.numReads.Add(1)

	return bytesRead, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	return rc.totalBytesRead.Load(), int(rc.numReads.Load())
}

// === WriteCounter ===

type writeCounter struct {
	writer            io.Writer
	totalBytesWritten atomic.Int64
	numWrites         atomic.Int64
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{
		writer: writer,
	}
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	written, err := wc.writer.Write(p)
	if err != nil {
		return written, err // Corrected: return written even if error
	}

	wc.totalBytesWritten.Add(int64(written))
	wc.numWrites.Add(1)

	return written, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	return wc.totalBytesWritten.Load(), int(wc.numWrites.Load())
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