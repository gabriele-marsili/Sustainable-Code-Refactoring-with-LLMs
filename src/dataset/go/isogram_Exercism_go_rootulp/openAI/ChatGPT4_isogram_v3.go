package isogram

import (
	"strings"
	"unicode"
)

// IsIsogram returns whether the provided string is an isogram.
// In other words, whether the string does not contain any duplicate characters.
func IsIsogram(s string) bool {
	seen := make(map[rune]struct{})
	for _, r := range strings.ToLower(s) {
		if unicode.IsLetter(r) {
			if _, exists := seen[r]; exists {
				return false
			}
			seen[r] = struct{}{}
		}
	}
	return true
}