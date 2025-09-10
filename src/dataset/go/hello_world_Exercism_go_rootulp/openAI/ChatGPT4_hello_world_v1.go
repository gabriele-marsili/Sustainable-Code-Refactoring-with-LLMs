package greeting

import "sync"

var (
	helloWorldOnce sync.Once
	helloWorldStr  string
)

// HelloWorld returns a string greeting.
func HelloWorld() string {
	helloWorldOnce.Do(func() {
		helloWorldStr = "Hello, World!"
	})
	return helloWorldStr
}