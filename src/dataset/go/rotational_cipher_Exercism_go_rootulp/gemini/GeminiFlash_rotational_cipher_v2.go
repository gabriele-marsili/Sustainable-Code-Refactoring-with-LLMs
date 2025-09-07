package rotationalcipher

import (
	"unicode"
)

const LETTERS_IN_ALPHABET = 26
const UPPERCASE_A = 65
const LOWERCASE_A = 97

func RotationalCipher(plain string, shiftKey int) string {
	result := make([]rune, len(plain))
	for i, r := range plain {
		if unicode.IsLower(r) {
			result[i] = rotateLetter(r, shiftKey, LOWERCASE_A)
		} else if unicode.IsUpper(r) {
			result[i] = rotateLetter(r, shiftKey, UPPERCASE_A)
		} else {
			result[i] = r
		}
	}
	return string(result)
}

func rotateLetter(r rune, shiftKey int, offset int) rune {
	return rune((int(r)-offset+shiftKey)%LETTERS_IN_ALPHABET + offset)
}