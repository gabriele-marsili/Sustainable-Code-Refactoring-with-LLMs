package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var sb strings.Builder
	sb.Grow(len(s) / 2) // Pre-allocate memory to reduce allocations

	first := true
	for _, r := range s {
		if unicode.IsLetter(r) {
			if first {
				sb.WriteRune(unicode.ToUpper(r))
				first = false
			}
		} else if r == ' ' || r == '-' {
			first = true
		}
	}
	return sb.String()
}