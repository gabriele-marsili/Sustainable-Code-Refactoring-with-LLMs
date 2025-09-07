package rotationalcipher

import "strings"

func RotationalCipher(plain string, shiftKey int) string {
	if len(plain) == 0 {
		return plain
	}
	
	// Normalize shift key to avoid unnecessary large shifts
	shiftKey = shiftKey % 26
	if shiftKey == 0 {
		return plain
	}
	
	var builder strings.Builder
	builder.Grow(len(plain))
	
	for _, c := range plain {
		if c >= 'a' && c <= 'z' {
			// Lowercase letter
			shifted := c + rune(shiftKey)
			if shifted > 'z' {
				shifted -= 26
			}
			builder.WriteRune(shifted)
		} else if c >= 'A' && c <= 'Z' {
			// Uppercase letter
			shifted := c + rune(shiftKey)
			if shifted > 'Z' {
				shifted -= 26
			}
			builder.WriteRune(shifted)
		} else {
			// Non-letter character
			builder.WriteRune(c)
		}
	}
	
	return builder.String()
}