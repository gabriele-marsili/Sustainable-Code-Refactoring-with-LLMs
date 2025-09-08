package isogram

import "unicode"

func IsIsogram(s string) bool {
	var seen [26]bool
	for _, char := range s {
		if char = unicode.ToLower(char); char >= 'a' && char <= 'z' {
			index := char - 'a'
			if seen[index] {
				return false
			}
			seen[index] = true
		}
	}
	return true
}