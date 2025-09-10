package greeting

import "sync"

var (
	helloWorldMessage string
	once              sync.Once
)

// HelloWorld greets the world.
func HelloWorld() string {
	once.Do(func() {
		helloWorldMessage = "Hello, World!"
	})
	return helloWorldMessage
}