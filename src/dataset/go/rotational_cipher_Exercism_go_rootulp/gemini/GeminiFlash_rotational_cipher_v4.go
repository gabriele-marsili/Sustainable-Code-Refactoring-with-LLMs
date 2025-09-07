package rotationalcipher

import (
	"strings"
	"unicode"
)

const LETTERS_IN_ALPHABET = 26
const UPPERCASE_A = 65
const LOWERCASE_A = 97

func RotationalCipher(plain string, shiftKey int) string {
	result := strings.Builder{}
	result.Grow(len(plain))

	for _, r := range plain {
		if unicode.IsLower(r) {
			result.WriteRune(rotateLetter(r, shiftKey, LOWERCASE_A))
		} else if unicode.IsUpper(r) {
			result.WriteRune(rotateLetter(r, shiftKey, UPPERCASE_A))
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

func rotateLetter(r rune, shiftKey int, offset int) rune {
	return rune((int(r)-offset+shiftKey)%LETTERS_IN_ALPHABET + offset)
}