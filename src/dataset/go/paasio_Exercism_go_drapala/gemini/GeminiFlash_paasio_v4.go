package paasio

import "io"
import "sync/atomic"

// Define readCounter and writeCounter types here.

type readCounter struct {
	reader    io.Reader
	bytesRead int64
	opsRead   int32
}

type writeCounter struct {
	writer     io.Writer
	bytesWritten int64
	opsWritten   int32
}

type readWriteCounter struct {
	readwriter io.ReadWriter
	readCounter
	writeCounter
}

// For the return of the function NewReadWriteCounter, you must also define a type that satisfies the ReadWriteCounter interface.

func NewWriteCounter(writer io.Writer) WriteCounter {
	return &writeCounter{writer: writer}
}

func NewReadCounter(reader io.Reader) ReadCounter {
	return &readCounter{reader: reader}
}

func NewReadWriteCounter(readwriter io.ReadWriter) ReadWriteCounter {
	return &readWriteCounter{readwriter: readwriter, readCounter: readCounter{}, writeCounter: writeCounter{}}
}

func (rc *readCounter) Read(p []byte) (int, error) {
	n, err := rc.reader.Read(p)
	if n > 0 {
		atomic.AddInt64(&rc.bytesRead, int64(n))
		atomic.AddInt32(&rc.opsRead, 1)
	}
	return n, err
}

func (rc *readCounter) ReadCount() (int64, int) {
	return atomic.LoadInt64(&rc.bytesRead), int(atomic.LoadInt32(&rc.opsRead))
}

func (wc *writeCounter) Write(p []byte) (int, error) {
	n, err := wc.writer.Write(p)
	if n > 0 {
		atomic.AddInt64(&wc.bytesWritten, int64(n))
		atomic.AddInt32(&wc.opsWritten, 1)
	}
	return n, err
}

func (wc *writeCounter) WriteCount() (int64, int) {
	return atomic.LoadInt64(&wc.bytesWritten), int(atomic.LoadInt32(&wc.opsWritten))
}

func (rwc *readWriteCounter) Read(p []byte) (int, error) {
	n, err := rwc.readwriter.Read(p)
	if n > 0 {
		atomic.AddInt64(&rwc.bytesRead, int64(n))
		atomic.AddInt32(&rwc.opsRead, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) Write(p []byte) (int, error) {
	n, err := rwc.readwriter.Write(p)
	if n > 0 {
		atomic.AddInt64(&rwc.bytesWritten, int64(n))
		atomic.AddInt32(&rwc.opsWritten, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) ReadCount() (int64, int) {
	return atomic.LoadInt64(&rwc.bytesRead), int(atomic.LoadInt32(&rwc.opsRead))
}

func (rwc *readWriteCounter) WriteCount() (int64, int) {
	return atomic.LoadInt64(&rwc.bytesWritten), int(atomic.LoadInt32(&rwc.opsWritten))
}