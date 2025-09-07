// Package twofer provides functionality for sharing items between two people.
package twofer

// ShareWith returns a sharing message for the given name.
// If name is empty, it returns a generic sharing message.
func ShareWith(name string) string {
	if name == "" {
		return "One for you, one for me."
	}
	return "One for " + name + ", one for me."
}