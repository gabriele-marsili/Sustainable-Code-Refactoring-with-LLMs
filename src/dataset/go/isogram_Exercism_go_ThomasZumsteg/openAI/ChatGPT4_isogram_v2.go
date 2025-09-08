package isogram

import "unicode"

func IsIsogram(s string) bool {
	var seen int32
	for _, char := range s {
		if char = unicode.ToLower(char); 'a' <= char && char <= 'z' {
			mask := int32(1) << (char - 'a')
			if seen&mask != 0 {
				return false
			}
			seen |= mask
		}
	}
	return true
}