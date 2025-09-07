package twofer

import "fmt"

// ShareWith returns a string in the format "One for <name>, one for me."
func ShareWith(name string) string {
    if name == "" {
        return "One for you, one for me."
    }
    return fmt.Sprintf("One for %s, one for me.", name)
}