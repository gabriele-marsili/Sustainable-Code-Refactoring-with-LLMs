package isogram

import (
	"strings"
)

func IsIsogram(word string) bool {
	word = strings.ToLower(word)
	seen := [26]bool{}

	for _, char := range word {
		if char >= 'a' && char <= 'z' {
			index := char - 'a'
			if seen[index] {
				return false
			}
			seen[index] = true
		}
	}

	return true
}