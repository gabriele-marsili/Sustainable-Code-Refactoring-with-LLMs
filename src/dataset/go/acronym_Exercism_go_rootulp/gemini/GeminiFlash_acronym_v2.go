package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var sb strings.Builder
	sb.Grow(len(s) / 2) // Pre-allocate memory to avoid reallocations

	var prev rune
	for _, r := range s {
		if unicode.IsLetter(r) {
			if prev == 0 || prev == ' ' || prev == '-' {
				sb.WriteRune(unicode.ToUpper(r))
			}
			prev = r
		} else if r == '-' || r == ' ' {
			prev = r
		} else {
			prev = 0
		}
	}

	return sb.String()
}