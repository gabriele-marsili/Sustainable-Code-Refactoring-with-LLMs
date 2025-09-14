package greeting

import (
    "fmt"
)

const helloMessage = "Hello, World!"

// HelloWorld greets the world.
func HelloWorld() string {
    fmt.Println(helloMessage)
    return helloMessage
}