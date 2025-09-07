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
	keyRunes []rune
	keyLen int
}

func NewCaesar() Cipher {
	return caesar{
		distance: 3,
	}
}

func (c caesar) Encode(s string) (encoded string) {
	return NewShift(c.distance).Encode(s)
}

func (c caesar) Decode(s string) (decoded string) {
	return NewShift(-c.distance).Encode(s)
}

func NewShift(distance int) Cipher {
	if distance >= 26 || distance == 0 || distance <= -26 {
		return nil
	}
	return shift{distance: distance}
}

func (c shift) Encode(input string) (encoded string) {
	input = strings.ToLower(input)
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, c.distance))
		}
	}
	return sb.String()
}

func (c shift) Decode(input string) (decoded string) {
	input = strings.ToLower(input)
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, -c.distance))
		}
	}
	return sb.String()
}

func NewVigenere(key string) Cipher {
	if !isValid(key) {
		return nil
	}
	runes := []rune(key)
	return vigenere{
		key: key,
		keyRunes: runes,
		keyLen: len(runes),
	}
}

func (v vigenere) Encode(input string) (encoded string) {
	stripped := stripFormatting(input)
	var sb strings.Builder
	sb.Grow(len(stripped))
	for i, r := range stripped {
		distance := int(v.keyRunes[i%v.keyLen] - 'a')
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, distance))
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) (decoded string) {
	stripped := stripFormatting(input)
	var sb strings.Builder
	sb.Grow(len(stripped))
	for i, r := range stripped {
		distance := int(v.keyRunes[i%v.keyLen] - 'a')
		if unicode.IsLetter(r) {
			sb.WriteRune(shiftLetter(r, -distance))
		}
	}
	return sb.String()
}

func shiftLetter(letter rune, distance int) (shifted rune) {
	shifted = rune(((int(letter-'a')+distance)%26+26)%26 + 'a')
	return
}

func stripFormatting(input string) []rune {
	input = strings.ToLower(input)
	runes := make([]rune, 0, len(input))
	for _, c := range input {
		if unicode.IsLetter(c) {
			runes = append(runes, c)
		}
	}
	return runes
}

func isValid(key string) bool {
	if key == "" {
		return false
	}
	if key == "a" || key == "aa" {
		return false
	}
	for _, r := range key {
		if !unicode.IsLower(r) {
			return false
		}
	}
	return true
}