package rotationalcipher

import "unicode"

const (
	LETTERS_IN_ALPHABET = 26
	UPPERCASE_A         = 65
	LOWERCASE_A         = 97
)

func RotationalCipher(plain string, shiftKey int) (cipherText string) {
	shiftKey %= LETTERS_IN_ALPHABET
	runes := make([]rune, len(plain))
	for i, r := range plain {
		runes[i] = rotate(r, shiftKey)
	}
	return string(runes)
}

func rotate(r rune, shiftKey int) rune {
	switch {
	case unicode.IsLower(r):
		return rotateLetter(r, shiftKey, LOWERCASE_A)
	case unicode.IsUpper(r):
		return rotateLetter(r, shiftKey, UPPERCASE_A)
	default:
		return r
	}
}

func rotateLetter(r rune, shiftKey int, offset int) rune {
	return rune((int(r)-offset+shiftKey)%LETTERS_IN_ALPHABET + offset)
}