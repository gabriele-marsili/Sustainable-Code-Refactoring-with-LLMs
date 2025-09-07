package rotationalcipher

import (
	"strings"
	"unicode"
)

const LETTERS_IN_ALPHABET = 26
const UPPERCASE_A = 65
const LOWERCASE_A = 97

func RotationalCipher(plain string, shiftKey int) string {
	if len(plain) == 0 {
		return ""
	}
	
	// Normalize shift key to avoid unnecessary modulo operations
	shiftKey = ((shiftKey % LETTERS_IN_ALPHABET) + LETTERS_IN_ALPHABET) % LETTERS_IN_ALPHABET
	
	var builder strings.Builder
	builder.Grow(len(plain))
	
	for _, r := range plain {
		builder.WriteRune(rotate(r, shiftKey))
	}
	return builder.String()
}

func rotate(r rune, shiftKey int) rune {
	if r >= 'a' && r <= 'z' {
		return rune((int(r)-LOWERCASE_A+shiftKey)%LETTERS_IN_ALPHABET + LOWERCASE_A)
	} else if r >= 'A' && r <= 'Z' {
		return rune((int(r)-UPPERCASE_A+shiftKey)%LETTERS_IN_ALPHABET + UPPERCASE_A)
	}
	return r
}