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
	if distance >= 26 || distance == 0 || distance <= -26 {
		return nil
	}
	return shift{distance: distance}
}

func (c shift) Encode(input string) string {
	input = strings.ToLower(input)
	var encoded strings.Builder
	encoded.Grow(len(input)) // Pre-allocate memory
	for _, r := range input {
		if unicode.IsLetter(r) {
			encoded.WriteRune(shiftLetter(r, c.distance))
		}
	}
	return encoded.String()
}

func (c shift) Decode(input string) string {
	input = strings.ToLower(input)
	var decoded strings.Builder
	decoded.Grow(len(input)) // Pre-allocate memory
	for _, r := range input {
		if unicode.IsLetter(r) {
			decoded.WriteRune(shiftLetter(r, -c.distance))
		}
	}
	return decoded.String()
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
	stripped := stripFormatting(input)
	keyLen := len(v.key)
	var encoded strings.Builder
	encoded.Grow(len(stripped))
	for i, r := range stripped {
		distance := int(v.key[i%keyLen] - 'a')
		encoded.WriteRune(shiftLetter(r, distance))
	}
	return encoded.String()
}

func (v vigenere) Decode(input string) string {
	stripped := stripFormatting(input)
	keyLen := len(v.key)
	var decoded strings.Builder
	decoded.Grow(len(stripped))
	for i, r := range stripped {
		distance := int(v.key[i%keyLen] - 'a')
		decoded.WriteRune(shiftLetter(r, -distance))
	}
	return decoded.String()
}

func shiftLetter(letter rune, distance int) rune {
	shifted := int(letter-'a') + distance
	shifted %= 26
	if shifted < 0 {
		shifted += 26
	}
	return rune(shifted + 'a')
}

func stripFormatting(input string) string {
	input = strings.ToLower(input)
	var stripped strings.Builder
	stripped.Grow(len(input))
	for _, c := range input {
		if unicode.IsLetter(c) {
			stripped.WriteRune(c)
		}
	}
	return stripped.String()
}

func isValid(key string) bool {
	if key == "" {
		return false
	}
	if key == "a" || key == "aa" {
		return false
	}

	lowerKey := strings.ToLower(key)
	if lowerKey != key {
		return false
	}

	for _, r := range key {
		if !unicode.IsLetter(r) {
			return false
		}
	}

	return true
}