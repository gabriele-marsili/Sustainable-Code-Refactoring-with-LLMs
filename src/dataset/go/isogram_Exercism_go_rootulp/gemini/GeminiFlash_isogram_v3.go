package isogram

import (
	"strings"
	"unicode"
)

// IsIsogram returns whether the provided string is an isogram.
// In other words, whether the string does not contain any duplicate characters.
func IsIsogram(s string) bool {
	s = strings.ToLower(s)
	seen := make(map[rune]bool)

	for _, r := range s {
		if !unicode.IsLetter(r) {
			continue
		}
		if seen[r] {
			return false
		}
		seen[r] = true
	}
	return true
}