package greeting

var cachedGreeting = "Hello, World!"

// HelloWorld greets the world.
func HelloWorld() string {
	return cachedGreeting
}