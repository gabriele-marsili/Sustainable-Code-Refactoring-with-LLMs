package isogram

import "strings"

func IsIsogram(word string) bool {
	word = strings.ToLower(word)
	seen := make(map[rune]bool)

	for _, r := range word {
		if 'a' <= r && r <= 'z' {
			if seen[r] {
				return false
			}
			seen[r] = true
		}
	}

	return true
}