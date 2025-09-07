package rotationalcipher

import "unicode"

func RotationalCipher(plain string, shiftKey int) string {
	shift := rune(shiftKey % 26)
	if shift < 0 {
		shift += 26
	}
	result := make([]rune, len(plain))
	for i, r := range plain {
		if unicode.IsLetter(r) {
			base := 'a'
			if unicode.IsUpper(r) {
				base = 'A'
			}
			rotated := r + shift
			if rotated > base+'z'-'a' && base == 'a' || rotated > base+'Z'-'A' && base == 'A' {
				rotated -= 26
			}
			result[i] = rotated
		} else {
			result[i] = r
		}
	}
	return string(result)
}