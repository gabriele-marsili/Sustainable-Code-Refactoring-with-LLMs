package twofer

// ShareWith returns a sharing message for the given name or "you" if empty
func ShareWith(name string) string {
	if name == "" {
		return "One for you, one for me."
	}
	return "One for " + name + ", one for me."
}