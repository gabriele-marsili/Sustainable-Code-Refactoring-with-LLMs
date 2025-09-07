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
	key []rune
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
	distance = distance % 26
	if distance == 0 {
		return nil
	}
	return shift{distance: distance}
}

func (c shift) Encode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(unicode.ToLower(r), c.distance))
		}
	}
	return sb.String()
}

func (c shift) Decode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(unicode.ToLower(r), -c.distance))
		}
	}
	return sb.String()
}

func NewVigenere(key string) Cipher {
	if !isValid(key) {
		return nil
	}
	return vigenere{
		key: []rune(key),
	}
}

func (v vigenere) Encode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	keyLen := len(v.key)
	for i, r := range stripFormatting(input) {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, int(v.key[i%keyLen]-'a')))
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	keyLen := len(v.key)
	for i, r := range stripFormatting(input) {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, -int(v.key[i%keyLen]-'a')))
		}
	}
	return sb.String()
}

func shiftLetter(letter rune, distance int) rune {
	return rune(((int(letter-'a')+distance+26)%26)+'a')
}

func stripFormatting(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, c := range input {
		if unicode.IsLetter(c) {
			sb.WriteRune(unicode.ToLower(c))
		}
	}
	return sb.String()
}

func isValid(key string) bool {
	if key == "" || key == "a" || key == "aa" {
		return false
	}
	for _, c := range key {
		if !unicode.IsLower(c) {
			return false
		}
	}
	return true
}