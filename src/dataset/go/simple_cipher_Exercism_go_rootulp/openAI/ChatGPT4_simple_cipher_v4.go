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
	stripped := stripFormatting(input)
	sb.Grow(len(stripped))
	for i, r := range stripped {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, getDistance(v.key, i)))
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) string {
	var sb strings.Builder
	stripped := stripFormatting(input)
	sb.Grow(len(stripped))
	for i, r := range stripped {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, -getDistance(v.key, i)))
		}
	}
	return sb.String()
}

func shiftLetter(letter rune, distance int) rune {
	return (letter-97+rune(distance)+26)%26 + 97
}

func getDistance(key []rune, index int) int {
	return int(key[index%len(key)] - 97)
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
	if len(key) == 0 || key == "a" || key == "aa" {
		return false
	}
	for _, c := range key {
		if !unicode.IsLower(c) {
			return false
		}
	}
	return true
}