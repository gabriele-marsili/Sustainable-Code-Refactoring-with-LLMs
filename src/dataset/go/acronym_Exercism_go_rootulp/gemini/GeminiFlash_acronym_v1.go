package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var sb strings.Builder
	sb.Grow(len(s) / 2) // Pre-allocate memory

	capitalizeNext := true
	for _, r := range s {
		if unicode.IsLetter(r) {
			if capitalizeNext {
				sb.WriteRune(unicode.ToUpper(r))
				capitalizeNext = false
			}
		} else if r == ' ' || r == '-' {
			capitalizeNext = true
		}
	}
	return sb.String()
}