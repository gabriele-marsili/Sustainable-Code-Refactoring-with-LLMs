package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	runes := []rune(plain)
	shift := rune(shiftKey % 26)

	for i, c := range runes {
		if unicode.IsLetter(c) {
			base := 'A'
			if unicode.IsLower(c) {
				base = 'a'
			}
			runes[i] = base + (c-base+shift)%26
		}
	}

	return string(runes)
}