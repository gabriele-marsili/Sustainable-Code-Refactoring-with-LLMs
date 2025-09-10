package greeting

import "sync"

var (
	helloWorldOnce sync.Once
	helloWorldMsg  string
)

// HelloWorld returns a string greeting.
func HelloWorld() string {
	helloWorldOnce.Do(func() {
		helloWorldMsg = "Hello, World!"
	})
	return helloWorldMsg
}