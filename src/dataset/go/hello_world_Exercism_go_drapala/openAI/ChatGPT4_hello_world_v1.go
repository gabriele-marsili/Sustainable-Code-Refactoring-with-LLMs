package greeting

import "fmt"

// HelloWorld greets the world.
func HelloWorld() string {
    const s = "Hello, World!"
    fmt.Println(s)
    return s
}