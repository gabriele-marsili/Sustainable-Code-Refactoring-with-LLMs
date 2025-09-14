package paasio

import (
	"io"
	"sync/atomic"
)

type readCounter struct {
	reader    io.Reader
	byteCount int64
	opCount   int64
}

type writeCounter struct {
	writer    io.Writer
	byteCount int64
	opCount   int64
}

type readWriteCounter struct {
	readwriter io.ReadWriter
	readBytes  int64
	readOps    int64
	writeBytes int64
	writeOps   int64
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{writer: writer}
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{reader: reader}
}

func NewReadWriteCounter(readwriter io.ReadWriter) ReadWriteCounter {
	return &readWriteCounter{readwriter: readwriter}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	if n > 0 {
		atomic.AddInt64(&rc.byteCount, int64(n))
		atomic.AddInt64(&rc.opCount, 1)
	}
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	return atomic.LoadInt64(&rc.byteCount), int(atomic.LoadInt64(&rc.opCount))
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	if n > 0 {
		atomic.AddInt64(&wc.byteCount, int64(n))
		atomic.AddInt64(&wc.opCount, 1)
	}
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	return atomic.LoadInt64(&wc.byteCount), int(atomic.LoadInt64(&wc.opCount))
}

func (rwc *readWriteCounter) Read(p []byte) (int, error) {
	n, err := rwc.readwriter.Read(p)
	if n > 0 {
		atomic.AddInt64(&rwc.readBytes, int64(n))
		atomic.AddInt64(&rwc.readOps, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) ReadCount() (int64, int) {
	return atomic.LoadInt64(&rwc.readBytes), int(atomic.LoadInt64(&rwc.readOps))
}

func (rwc *readWriteCounter) Write(p []byte) (int, error) {
	n, err := rwc.readwriter.Write(p)
	if n > 0 {
		atomic.AddInt64(&rwc.writeBytes, int64(n))
		atomic.AddInt64(&rwc.writeOps, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) WriteCount() (int64, int) {
	return atomic.LoadInt64(&rwc.writeBytes), int(atomic.LoadInt64(&rwc.writeOps))
}