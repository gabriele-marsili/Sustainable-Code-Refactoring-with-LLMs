package isogram

import "unicode"

func IsIsogram(s string) bool {
	seen := [26]bool{}
	for _, char := range s {
		char = unicode.ToLower(char)
		if 'a' <= char && char <= 'z' {
			index := char - 'a'
			if seen[index] {
				return false
			}
			seen[index] = true
		}
	}
	return true
}