package isogram

import (
	"strings"
)

func IsIsogram(word string) bool {
	word = strings.ToLower(word)
	seen := make(map[rune]bool)

	for _, char := range word {
		if 'a' <= char && char <= 'z' {
			if seen[char] {
				return false
			}
			seen[char] = true
		}
	}

	return true
}