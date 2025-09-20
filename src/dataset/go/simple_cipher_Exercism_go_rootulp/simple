package cipher

import (
	"strings"
	"unicode"
)

type caesar struct {
	distance int
}
type shift struct {
	distance int
}
type vigenere struct {
	key string
}

func NewCaesar() Cipher {
	return caesar{
		distance: 3,
	}
}

func (c caesar) Encode(s string) string {
	return NewShift(c.distance).Encode(s)
}

func (c caesar) Decode(s string) string {
	return NewShift(-c.distance).Encode(s)
}

func NewShift(distance int) Cipher {
	distance = ((distance % 26) + 26) % 26 // Normalize distance to [0, 25]
	if distance == 0 {
		return nil
	}
	return shift{distance: distance}
}

func (c shift) Encode(input string) string {
	var builder strings.Builder
	builder.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			builder.WriteRune(shiftLetter(unicode.ToLower(r), c.distance))
		}
	}
	return builder.String()
}

func (c shift) Decode(input string) string {
	var builder strings.Builder
	builder.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			builder.WriteRune(shiftLetter(unicode.ToLower(r), -c.distance))
		}
	}
	return builder.String()
}

func NewVigenere(key string) Cipher {
	if !isValid(key) {
		return nil
	}
	return vigenere{
		key: key,
	}
}

func (v vigenere) Encode(input string) string {
	keyRunes := []rune(v.key)
	keyLen := len(keyRunes)
	var builder strings.Builder
	builder.Grow(len(input))
	for i, r := range input {
		if unicode.IsLetter(r) {
			distance := int(keyRunes[i%keyLen] - 'a')
			builder.WriteRune(shiftLetter(unicode.ToLower(r), distance))
		}
	}
	return builder.String()
}

func (v vigenere) Decode(input string) string {
	keyRunes := []rune(v.key)
	keyLen := len(keyRunes)
	var builder strings.Builder
	builder.Grow(len(input))
	for i, r := range input {
		if unicode.IsLetter(r) {
			distance := int(keyRunes[i%keyLen] - 'a')
			builder.WriteRune(shiftLetter(unicode.ToLower(r), -distance))
		}
	}
	return builder.String()
}

func shiftLetter(letter rune, distance int) rune {
	return 'a' + (letter-'a'+rune(distance)+26)%26
}

func isValid(key string) bool {
	if len(key) == 0 {
		return false
	}
	for _, r := range key {
		if !unicode.IsLower(r) {
			return false
		}
	}
	return true
}