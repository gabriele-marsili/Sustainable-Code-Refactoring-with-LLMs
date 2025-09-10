package paasio

import "io"
import "sync/atomic"

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
	readwriter io.ReadWriter
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
	return atomic.LoadInt64(&rc.bytesRead), int(atomic.LoadInt64(&rc.opsRead))
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
	return atomic.LoadInt64(&wc.bytesWritten), int(atomic.LoadInt64(&wc.opsWritten))
}

func (rwc *readWriteCounter) Read(p []byte) (int, error) {
	n, err := rwc.readwriter.Read(p)
	if n > 0 {
		atomic.AddInt64(&rwc.readCounter.bytesRead, int64(n))
		atomic.AddInt64(&rwc.readCounter.opsRead, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) Write(p []byte) (int, error) {
	n, err := rwc.readwriter.Write(p)
	if n > 0 {
		atomic.AddInt64(&rwc.writeCounter.bytesWritten, int64(n))
		atomic.AddInt64(&rwc.writeCounter.opsWritten, 1)
	}
	return n, err
}

func (rwc *readWriteCounter) ReadCount() (int64, int) {
	return atomic.LoadInt64(&rwc.readCounter.bytesRead), int(atomic.LoadInt64(&rwc.readCounter.opsRead))
}

func (rwc *readWriteCounter) WriteCount() (int64, int) {
	return atomic.LoadInt64(&rwc.writeCounter.bytesWritten), int(atomic.LoadInt64(&rwc.writeCounter.opsWritten))
}