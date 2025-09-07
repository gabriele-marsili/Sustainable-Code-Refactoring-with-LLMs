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

func (s shift) Encode(input string) string {
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			result = append(result, shiftLetter(r, s.distance))
		}
	}
	return string(result)
}

func (s shift) Decode(input string) string {
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			result = append(result, shiftLetter(r, -s.distance))
		}
	}
	return string(result)
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

func (v vigenere) Encode(input string) string {
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	keyIndex := 0
	for _, r := range input {
		if unicode.IsLetter(r) {
			distance := int(v.keyRunes[keyIndex%v.keyLen] - 'a')
			result = append(result, shiftLetter(r, distance))
			keyIndex++
		}
	}
	return string(result)
}

func (v vigenere) Decode(input string) string {
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	keyIndex := 0
	for _, r := range input {
		if unicode.IsLetter(r) {
			distance := int(v.keyRunes[keyIndex%v.keyLen] - 'a')
			result = append(result, shiftLetter(r, -distance))
			keyIndex++
		}
	}
	return string(result)
}

func shiftLetter(letter rune, distance int) rune {
	shifted := rune(int(letter-'a'+rune(distance))%26 + 'a')
	if shifted < 'a' {
		shifted += 26
	}
	return shifted
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
	if len(key) == 1 && key[0] == 'a' {
		return false
	}

	allA := true
	for _, r := range key {
		if r != 'a' {
			allA = false
			break
		}
	}
	if allA && len(key) > 0 {
		return false
	}

	return true
}