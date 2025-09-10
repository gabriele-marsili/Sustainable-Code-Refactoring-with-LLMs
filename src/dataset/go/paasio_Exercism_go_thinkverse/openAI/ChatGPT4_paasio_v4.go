package paasio

import (
	"io"
	"sync"
)

type readCounter struct {
	reader io.Reader
	nbyte  int64
	nops   int64
	mutex  sync.Mutex
}

type writeCounter struct {
	writer io.Writer
	nbyte  int64
	nops   int64
	mutex  sync.Mutex
}

type readwriteCounter struct {
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
	return &readwriteCounter{
		readCounter:  readCounter{reader: readwriter},
		writeCounter: writeCounter{writer: readwriter},
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	if n > 0 {
		rc.mutex.Lock()
		rc.nbyte += int64(n)
		rc.nops++
		rc.mutex.Unlock()
	}
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	rc.mutex.Lock()
	defer rc.mutex.Unlock()
	return rc.nbyte, int(rc.nops)
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	if n > 0 {
		wc.mutex.Lock()
		wc.nbyte += int64(n)
		wc.nops++
		wc.mutex.Unlock()
	}
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	wc.mutex.Lock()
	defer wc.mutex.Unlock()
	return wc.nbyte, int(wc.nops)
}