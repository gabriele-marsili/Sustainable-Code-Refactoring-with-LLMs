package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	result := make([]rune, len(plain))
	for i, c := range plain {
		if unicode.IsLetter(c) {
			base := 'A'
			if unicode.IsLower(c) {
				base = 'a'
			}
			result[i] = (c-base+rune(shiftKey))%26 + base
		} else {
			result[i] = c
		}
	}
	return string(result)
}