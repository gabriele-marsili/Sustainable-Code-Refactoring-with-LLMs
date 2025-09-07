package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var result strings.Builder
	result.Grow(len(s) / 4) // Pre-allocate reasonable capacity
	
	needsLetter := true
	for _, r := range s {
		if r == '-' || r == ' ' || !unicode.IsLetter(r) {
			needsLetter = true
		} else if needsLetter {
			result.WriteRune(unicode.ToUpper(r))
			needsLetter = false
		}
	}
	
	return result.String()
}