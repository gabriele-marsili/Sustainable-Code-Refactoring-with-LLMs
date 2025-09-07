package twofer

import "fmt"

// ShareWith returns a string with a personalized message.
// If the name is empty, it defaults to "you".
func ShareWith(name string) string {
	if name == "" {
		return "One for you, one for me."
	}
	return fmt.Sprintf("One for %s, one for me.", name)
}