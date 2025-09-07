package rotationalcipher

import (
	"strings"
	"unicode"
)

const (
	LETTERS_IN_ALPHABET = 26
	UPPERCASE_A         = 65
	LOWERCASE_A         = 97
)

func RotationalCipher(plain string, shiftKey int) string {
	var sb strings.Builder
	sb.Grow(len(plain)) // Preallocate memory for the result

	shiftKey %= LETTERS_IN_ALPHABET // Normalize shiftKey to avoid unnecessary computations
	for _, r := range plain {
		if unicode.IsLower(r) {
			sb.WriteRune(rotateLetter(r, shiftKey, LOWERCASE_A))
		} else if unicode.IsUpper(r) {
			sb.WriteRune(rotateLetter(r, shiftKey, UPPERCASE_A))
		} else {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

func rotateLetter(r rune, shiftKey int, offset int) rune {
	return rune((int(r)-offset+shiftKey)%LETTERS_IN_ALPHABET + offset)
}