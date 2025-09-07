package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	shiftKey = shiftKey % 26 // Optimize for large shiftKey values
	runes := []rune(plain)   // Convert to rune slice once to avoid repeated conversions
	for i, c := range runes {
		if unicode.IsLetter(c) {
			base := 'A'
			if unicode.IsLower(c) {
				base = 'a'
			}
			runes[i] = (c-base+rune(shiftKey))%26 + base
		}
	}
	return string(runes)
}