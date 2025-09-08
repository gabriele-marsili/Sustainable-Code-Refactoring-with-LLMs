package isogram

import (
	"strings"
	"unicode"
)

// IsIsogram returns whether the provided string is an isogram.
// In other words, whether the string does not contain any duplicate characters.
func IsIsogram(s string) bool {
	seen := make(map[rune]struct{})
	for _, r := range s {
		if unicode.IsLetter(r) {
			r = unicode.ToLower(r)
			if _, exists := seen[r]; exists {
				return false
			}
			seen[r] = struct{}{}
		}
	}
	return true
}