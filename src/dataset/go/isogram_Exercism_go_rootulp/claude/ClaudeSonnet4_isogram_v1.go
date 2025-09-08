package isogram

import (
	"unicode"
)

// IsIsogram returns whether the provided string is an isogram.
// In other words, whether the string does not contain any duplicate characters.
func IsIsogram(s string) bool {
	seen := make(map[rune]bool)
	
	for _, r := range s {
		if unicode.IsLetter(r) {
			// Convert to lowercase inline
			if r >= 'A' && r <= 'Z' {
				r = r + 32
			} else if r > 127 {
				r = unicode.ToLower(r)
			}
			
			if seen[r] {
				return false
			}
			seen[r] = true
		}
	}
	return true
}

func preserveOnlyLetters(s string) string {
	result := make([]rune, 0, len(s))
	for _, r := range s {
		if unicode.IsLetter(r) {
			result = append(result, r)
		}
	}
	return string(result)
}

func doesContainUniqueLetters(s string) bool {
	seen := make(map[rune]bool)

	for _, c := range s {
		if seen[c] {
			return false
		}
		seen[c] = true
	}
	return true
}