package paasio

import "io"

type readCounter struct {
	reader    io.Reader
	bytesRead int64
	readOps   int
}

type writeCounter struct {
	writer     io.Writer
	bytesWritten int64
	writeOps   int
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
		readCounter:  readCounter{reader: readwriter},
		writeCounter: writeCounter{writer: readwriter},
		readwriter:   readwriter,
	}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	if n > 0 {
		rc.bytesRead += int64(n)
		rc.readOps++
	}
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	return rc.bytesRead, rc.readOps
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	if n > 0 {
		wc.bytesWritten += int64(n)
		wc.writeOps++
	}
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	return wc.bytesWritten, wc.writeOps
}