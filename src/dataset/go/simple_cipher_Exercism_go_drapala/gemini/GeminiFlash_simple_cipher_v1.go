package cipher

import (
	"strings"
	"unicode"
)

// Cipher interface
type Cipher interface {
	Encode(input string) string
	Decode(input string) string
}

// Shift
type shift struct {
	distance int // Shift distance
}

// Normalizes rune into a-z range for both encode and decode
func shiftchar(r rune, distance int) rune {
	shifted := r + rune(distance)
	if shifted > 'z' {
		shifted -= 26
	} else if shifted < 'a' {
		shifted += 26
	}
	return shifted
}

// Cleans garbage out of input like spaces, non a-z etc.
func cleaninput(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		r = unicode.ToLower(r)
		if r >= 'a' && r <= 'z' {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

// Note:
// 1. Encode will ignore all values in the string that are not A-Za-z.
// 2. The output will be also normalized to lowercase.
func (c shift) Encode(input string) string {
	input = cleaninput(input)
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		sb.WriteRune(shiftchar(r, c.distance))
	}
	return sb.String()
}

func (c shift) Decode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input {
		sb.WriteRune(shiftchar(r, -c.distance))
	}
	return sb.String()
}

// Vigenere
type vigenere struct {
	key string
}

func propervignerekey(input, key string) string {
	keyLen := len(key)
	inputLen := len(input)

	if keyLen >= inputLen {
		return key[:inputLen]
	}

	var sb strings.Builder
	sb.Grow(inputLen)
	sb.WriteString(key)

	for i := keyLen; i < inputLen; i++ {
		sb.WriteByte(key[i%keyLen])
	}

	return sb.String()
}

func (v vigenere) Encode(input string) string {
	input = cleaninput(input)
	properKey := propervignerekey(input, v.key)

	var sb strings.Builder
	sb.Grow(len(input))

	for i, r := range input {
		keyChar := properKey[i]
		if keyChar == 'a' {
			sb.WriteRune(r)
		} else {
			shiftDistance := int(keyChar - 'a')
			sb.WriteRune(shiftchar(r, shiftDistance))
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) string {
	properKey := propervignerekey(input, v.key)

	var sb strings.Builder
	sb.Grow(len(input))

	for i, r := range input {
		keyChar := properKey[i]
		if keyChar == 'a' {
			sb.WriteRune(r)
		} else {
			shiftDistance := int(keyChar - 'a')
			sb.WriteRune(shiftchar(r, -shiftDistance))
		}
	}
	return sb.String()
}

// Functions
func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	if distance >= -25 && distance <= 25 && distance != 0 {
		return shift{distance: distance}
	}
	return nil
}

// Note:
// 1. Argument for NewVigenere must consist of lower case letters a-z only.
// 2. Values consisting entirely of the letter 'a' are disallowed.

// For invalid arguments NewVigenere returns nil.
func NewVigenere(key string) Cipher {
	if key == "" {
		return nil
	}

	allA := true
	for _, r := range key {
		if r < 'a' || r > 'z' {
			return nil
		}
		if r != 'a' {
			allA = false
		}
	}

	if allA {
		return nil
	}

	return vigenere{key: key}
}