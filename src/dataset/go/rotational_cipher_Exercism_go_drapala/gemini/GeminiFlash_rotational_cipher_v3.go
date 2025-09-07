package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	result := make([]rune, len(plain))
	shift := rune(shiftKey % 26)

	for i, char := range plain {
		if unicode.IsLetter(char) {
			base := 'a'
			if unicode.IsUpper(char) {
				base = 'A'
			}
			rotated := char + shift
			if rotated > base+'z'-'a' && base == 'a' {
				rotated -= 26
			} else if rotated > base+'Z'-'A' && base == 'A' {
				rotated -= 26
			}
			result[i] = rotated
		} else {
			result[i] = char
		}
	}
	return string(result)
}