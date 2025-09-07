package rotationalcipher

import (
	"strings"
	"unicode"
)

const (
	lettersInAlphabet = 26
	uppercaseA        = 'A'
	lowercaseA        = 'a'
)

func RotationalCipher(plain string, shiftKey int) string {
	var builder strings.Builder
	builder.Grow(len(plain))
	for _, r := range plain {
		builder.WriteRune(rotate(r, shiftKey))
	}
	return builder.String()
}

func rotate(r rune, shiftKey int) rune {
	switch {
	case unicode.IsLower(r):
		return rotateLetter(r, shiftKey, lowercaseA)
	case unicode.IsUpper(r):
		return rotateLetter(r, shiftKey, uppercaseA)
	default:
		return r
	}
}

func rotateLetter(r rune, shiftKey int, offset rune) rune {
	return (r-offset+rune(shiftKey))%lettersInAlphabet + offset
}