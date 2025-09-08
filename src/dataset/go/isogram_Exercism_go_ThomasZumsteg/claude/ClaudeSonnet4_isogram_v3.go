package isogram

import "unicode"

func IsIsogram(s string) bool {
	var seen uint32
	for _, char := range s {
		if char >= 'A' && char <= 'Z' {
			char += 32
		} else if char < 'a' || char > 'z' {
			if !unicode.IsLetter(char) {
				continue
			}
			char = unicode.ToLower(char)
			if char < 'a' || char > 'z' {
				continue
			}
		}
		
		bit := uint32(1) << (char - 'a')
		if seen&bit != 0 {
			return false
		}
		seen |= bit
	}
	return true
}