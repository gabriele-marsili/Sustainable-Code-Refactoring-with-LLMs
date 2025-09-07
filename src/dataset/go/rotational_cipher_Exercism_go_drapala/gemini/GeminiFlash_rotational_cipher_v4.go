package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	result := make([]rune, len(plain))
	for i, c := range plain {
		if unicode.IsLetter(c) {
			base := 'a'
			if unicode.IsUpper(c) {
				base = 'A'
			}
			rotated := (c - rune(base) + rune(shiftKey)) % 26
			result[i] = rune(base) + rotated
		} else {
			result[i] = c
		}
	}
	return string(result)
}