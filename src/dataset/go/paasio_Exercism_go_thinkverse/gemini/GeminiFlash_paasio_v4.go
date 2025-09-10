package paasio

import (
	"io"
	"sync/atomic"
)

// Define readCounter and writeCounter types here.
type readCounter struct {
	reader io.Reader
	nbyte  int64
	nops   int64
}

type writeCounter struct {
	writer io.Writer
	nbyte  int64
	nops   int64
}

// For the return of the function NewReadWriteCounter, you must also define a type that satisfies the ReadWriteCounter interface.
type readwriteCounter struct {
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
	return &readwriteCounter{
		NewReadCounter(readwriter),
		NewWriteCounter(readwriter),
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)

	if n > 0 {
		atomic.AddInt64(&rc.nbyte, int64(n))
		atomic.AddInt64(&rc.nops, 1)
	}

	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	nbyte := atomic.LoadInt64(&rc.nbyte)
	nops := atomic.LoadInt64(&rc.nops)
	return nbyte, int(nops)
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)

	if n > 0 {
		atomic.AddInt64(&wc.nbyte, int64(n))
		atomic.AddInt64(&wc.nops, 1)
	}

	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	nbyte := atomic.LoadInt64(&wc.nbyte)
	nops := atomic.LoadInt64(&wc.nops)
	return nbyte, int(nops)
}