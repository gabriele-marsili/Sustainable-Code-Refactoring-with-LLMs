package isogram

import "unicode"

func IsIsogram(s string) bool {
	var seen uint32
	for _, char := range s {
		char = unicode.ToLower(char)
		if 'a' <= char && char <= 'z' {
			bit := uint32(1) << (char - 'a')
			if seen&bit != 0 {
				return false
			}
			seen |= bit
		}
	}
	return true
}