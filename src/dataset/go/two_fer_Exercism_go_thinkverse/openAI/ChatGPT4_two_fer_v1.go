package twofer

import "strings"

func ShareWith(name string) string {
	if name == "" {
		return "One for you, one for me."
	}

	var sb strings.Builder
	sb.Grow(16 + len(name)) // Preallocate memory for the string
	sb.WriteString("One for ")
	sb.WriteString(name)
	sb.WriteString(", one for me.")
	return sb.String()
}