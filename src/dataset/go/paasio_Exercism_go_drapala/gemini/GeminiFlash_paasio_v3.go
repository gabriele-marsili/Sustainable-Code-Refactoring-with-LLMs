package paasio

import (
	"io"
	"sync/atomic"
)

type readCounter struct {
	reader    io.Reader
	bytesRead int64
	opsRead   int64
}

type writeCounter struct {
	writer     io.Writer
	bytesWritten int64
	opsWritten   int64
}

type readWriteCounter struct {
	readCounter
	writeCounter
	readwriter io.ReadWriter
}

type ReadCounter interface {
	Read(p []byte) (n int, err error)
	ReadCount() (n int64, nops int)
}

type WriteCounter interface {
	Write(p []byte) (n int, err error)
	WriteCount() (n int64, nops int)
}

type ReadWriteCounter interface {
	ReadCounter
	WriteCounter
}

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{writer: writer}
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{reader: reader}
}

func NewReadWriteCounter(readwriter io.ReadWriter) ReadWriteCounter {
	return &readWriteCounter{
		readwriter: readwriter,
		readCounter: readCounter{
			reader: readwriter,
		},
		writeCounter: writeCounter{
			writer: readwriter,
		},
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	if n > 0 {
		atomic.AddInt64(&rc.bytesRead, int64(n))
		atomic.AddInt64(&rc.opsRead, 1)
	}
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	bytes := atomic.LoadInt64(&rc.bytesRead)
	ops := atomic.LoadInt64(&rc.opsRead)
	return bytes, int(ops)
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	if n > 0 {
		atomic.AddInt64(&wc.bytesWritten, int64(n))
		atomic.AddInt64(&wc.opsWritten, 1)
	}
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	bytes := atomic.LoadInt64(&wc.bytesWritten)
	ops := atomic.LoadInt64(&wc.opsWritten)
	return bytes, int(ops)
}

func (rwc *readWriteCounter) Read(p []byte) (int, error) {
	return rwc.readCounter.Read(p)
}

func (rwc *readWriteCounter) ReadCount() (int64, int) {
	return rwc.readCounter.ReadCount()
}

func (rwc *readWriteCounter) Write(p []byte) (int, error) {
	return rwc.writeCounter.Write(p)
}

func (rwc *readWriteCounter) WriteCount() (int64, int) {
	return rwc.writeCounter.WriteCount()
}