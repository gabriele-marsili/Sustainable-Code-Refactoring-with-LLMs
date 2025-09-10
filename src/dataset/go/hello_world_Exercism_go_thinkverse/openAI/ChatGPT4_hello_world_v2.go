package greeting

import "sync"

var (
	helloWorldOnce sync.Once
	helloWorldMsg  string
)

// HelloWorld greets the world.
func HelloWorld() string {
	helloWorldOnce.Do(func() {
		helloWorldMsg = "Hello, World!"
	})
	return helloWorldMsg
}