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
	return caesar{distance: 3}
}

func (c caesar) Encode(s string) string {
	return NewShift(c.distance).Encode(s)
}

func (c caesar) Decode(s string) string {
	return NewShift(-c.distance).Encode(s)
}

func NewShift(distance int) Cipher {
	if distance == 0 || distance > 25 || distance < -25 {
		return nil
	}
	return shift{distance: distance}
}

func (s shift) Encode(input string) string {
	return shiftString(input, s.distance)
}

func (s shift) Decode(input string) string {
	return shiftString(input, -s.distance)
}

func NewVigenere(key string) Cipher {
	if !isValid(key) {
		return nil
	}
	return vigenere{key: key}
}

func (v vigenere) Encode(input string) string {
	return vigenereCipher(input, v.key, true)
}

func (v vigenere) Decode(input string) string {
	return vigenereCipher(input, v.key, false)
}

func shiftString(input string, distance int) string {
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	for _, r := range input {
		if unicode.IsLetter(r) {
			result = append(result, shiftLetter(r, distance))
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

func vigenereCipher(input string, key string, encode bool) string {
	keyLen := len(key)
	input = strings.ToLower(input)
	result := make([]rune, 0, len(input))
	keyIndex := 0

	for _, r := range input {
		if unicode.IsLetter(r) {
			keyRune := rune(key[keyIndex%keyLen])
			distance := int(keyRune - 'a')
			if !encode {
				distance = -distance
			}
			result = append(result, shiftLetter(r, distance))
			keyIndex++
		}
	}
	return string(result)
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

	if key == "a" || strings.Count(key, "a") == len(key) {
		return false
	}

	return true
}