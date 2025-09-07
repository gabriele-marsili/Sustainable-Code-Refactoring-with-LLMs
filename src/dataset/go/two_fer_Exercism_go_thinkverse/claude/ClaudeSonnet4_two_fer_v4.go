package twofer

import "strings"

func ShareWith(name string) string {
	if name == "" {
		return "One for you, one for me."
	}

	var builder strings.Builder
	builder.Grow(15 + len(name))
	builder.WriteString("One for ")
	builder.WriteString(name)
	builder.WriteString(", one for me.")
	return builder.String()
}