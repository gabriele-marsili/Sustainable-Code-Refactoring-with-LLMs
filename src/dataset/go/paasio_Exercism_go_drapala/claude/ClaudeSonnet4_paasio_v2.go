package paasio

import "io"

type readCounter struct {
	reader io.Reader
	count  int64
	ops    int
}

type writeCounter struct {
	writer io.Writer
	count  int64
	ops    int
}

type readWriteCounter struct {
	readwriter io.ReadWriter
	readCount  int64
	readOps    int
	writeCount int64
	writeOps   int
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
	rc.count += int64(n)
	rc.ops++
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	return rc.count, rc.ops
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	wc.count += int64(n)
	wc.ops++
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	return wc.count, wc.ops
}

func (rwc *readWriteCounter) Read(p []byte) (int, error) {
	n, err := rwc.readwriter.Read(p)
	rwc.readCount += int64(n)
	rwc.readOps++
	return n, err
}

func (rwc *readWriteCounter) Write(p []byte) (int, error) {
	n, err := rwc.readwriter.Write(p)
	rwc.writeCount += int64(n)
	rwc.writeOps++
	return n, err
}

func (rwc *readWriteCounter) ReadCount() (int64, int) {
	return rwc.readCount, rwc.readOps
}

func (rwc *readWriteCounter) WriteCount() (int64, int) {
	return rwc.writeCount, rwc.writeOps
}