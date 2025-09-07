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
	key    string
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
	var result strings.Builder
	result.Grow(len(input))
	
	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			result.WriteRune(shiftLetter(r+32, c.distance))
		} else if r >= 'a' && r <= 'z' {
			result.WriteRune(shiftLetter(r, c.distance))
		}
	}
	return result.String()
}

func (c shift) Decode(input string) (decoded string) {
	var result strings.Builder
	result.Grow(len(input))
	
	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			result.WriteRune(shiftLetter(r+32, -c.distance))
		} else if r >= 'a' && r <= 'z' {
			result.WriteRune(shiftLetter(r, -c.distance))
		}
	}
	return result.String()
}

func NewVigenere(key string) Cipher {
	if !isValid(key) {
		return nil
	}
	return vigenere{
		key:    key,
		keyLen: len(key),
	}
}

func (v vigenere) Encode(input string) (encoded string) {
	stripped := stripFormatting(input)
	var result strings.Builder
	result.Grow(len(stripped))
	
	for i, r := range stripped {
		distance := getDistance(v.key, v.keyLen, i)
		result.WriteRune(shiftLetter(r, distance))
	}
	return result.String()
}

func (v vigenere) Decode(input string) (decoded string) {
	stripped := stripFormatting(input)
	var result strings.Builder
	result.Grow(len(stripped))
	
	for i, r := range stripped {
		distance := getDistance(v.key, v.keyLen, i)
		result.WriteRune(shiftLetter(r, -distance))
	}
	return result.String()
}

func shiftLetter(letter rune, distance int) rune {
	shifted := int(letter-'a') + distance
	if shifted < 0 {
		shifted += 26
	}
	return rune(shifted%26 + 'a')
}

func getDistance(key string, keyLen, index int) int {
	return int(key[index%keyLen] - 'a')
}

func stripFormatting(input string) string {
	var result strings.Builder
	result.Grow(len(input))
	
	for _, c := range input {
		if c >= 'A' && c <= 'Z' {
			result.WriteRune(c + 32)
		} else if c >= 'a' && c <= 'z' {
			result.WriteRune(c)
		}
	}
	return result.String()
}

func isValid(key string) bool {
	if len(key) == 0 || key == "a" || key == "aa" {
		return false
	}
	
	for _, c := range key {
		if c < 'a' || c > 'z' {
			return false
		}
	}
	return true
}