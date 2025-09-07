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
		result.WriteRune(rotate(r, shiftKey))
	}
	return result.String()
}

func rotate(r rune, shiftKey int) rune {
	if unicode.IsLetter(r) {
		var offset int
		if unicode.IsLower(r) {
			offset = LOWERCASE_A
		} else {
			offset = UPPERCASE_A
		}
		return rune((int(r)-offset+shiftKey)%LETTERS_IN_ALPHABET + offset)
	}
	return r
}