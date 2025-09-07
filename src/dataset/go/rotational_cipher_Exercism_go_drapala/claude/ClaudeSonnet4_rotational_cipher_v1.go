package rotationalcipher

import "strings"

func RotationalCipher(plain string, shiftKey int) string {
	if len(plain) == 0 {
		return plain
	}
	
	// Normalize shift key to avoid unnecessary calculations
	shiftKey = shiftKey % 26
	if shiftKey == 0 {
		return plain
	}
	
	var result strings.Builder
	result.Grow(len(plain))
	
	for _, c := range plain {
		if c >= 'a' && c <= 'z' {
			// Lowercase letter
			shifted := c + rune(shiftKey)
			if shifted > 'z' {
				shifted -= 26
			}
			result.WriteRune(shifted)
		} else if c >= 'A' && c <= 'Z' {
			// Uppercase letter
			shifted := c + rune(shiftKey)
			if shifted > 'Z' {
				shifted -= 26
			}
			result.WriteRune(shifted)
		} else {
			// Non-letter character
			result.WriteRune(c)
		}
	}
	
	return result.String()
}