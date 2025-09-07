package cipher

import (
	"strings"
	"unicode"
)

// Define the shift and vigenere types here.
// Both types should satisfy the Cipher interface.
// Great tutorial on interfaces: https://gobyexample.com/interfaces

// Shift
type shift struct {
	distance int // Shift distance
}

// Normalizes rune into a-z range for both encode and decode
func shiftchar(newchar rune) rune {
	if newchar > 'z' { // if we fall right-side of z
		return newchar - 26 // wrap back left into a-z range
	} else if newchar < 'a' { // if we fall left-side of a
		return newchar + 26 // wrap back right into a-z range
	}
	return newchar // keep as is
}

// Cleans garbage out of input like spaces, non a-z etc.
func cleaninput(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, x := range input { // for each character in input
		x = unicode.ToLower(x) // normalize to lowercase
		if x >= 'a' && x <= 'z' { // only accepts a-z
			sb.WriteRune(x)
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
	for _, x := range input { // for each character in clean input
		newchar := shiftchar(x + rune(c.distance)) // Add since encode
		sb.WriteRune(newchar)
	}
	return sb.String()
}

func (c shift) Decode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, x := range input { // for each character in input
		newchar := shiftchar(x - rune(c.distance)) // Subtract since decode
		sb.WriteRune(newchar)
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
	input = cleaninput(input) // Clean input so our key is clean

	// 1. Use the length of input to generate key with proper length
	proper_key := propervignerekey(input, v.key)

	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var sb strings.Builder
	sb.Grow(len(input))
	for i, x := range input {
		keyChar := proper_key[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			sb.WriteRune(x)
		} else { // Non 'a' key
			shiftDistance := int(keyChar - 'a')
			newChar := shiftchar(x + rune(shiftDistance))
			sb.WriteRune(newChar) // Add encoded character to output
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) string {
	// 1. Use the length of input to generate key with proper length
	proper_key := propervignerekey(input, v.key)
	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var sb strings.Builder
	sb.Grow(len(input))
	for i, x := range input {
		keyChar := proper_key[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			sb.WriteRune(x)
		} else { // Non 'a' key
			shiftDistance := int(keyChar - 'a')
			newChar := shiftchar(x - rune(shiftDistance))
			sb.WriteRune(newChar) // Add encoded character to output
		}
	}
	return sb.String()
}

// Functions
func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	if distance <= -1 || distance >= 1 {
		if distance > 25 || distance < -25 {
			return nil
		}
		return shift{distance: distance}
	}
	return nil
}

// Note:
// 1. Argument for NewVigenere must consist of lower case letters a-z only.
// 2. Values consisting entirely of the letter 'a' are disallowed.

// For invalid arguments NewVigenere returns nil.
func NewVigenere(key string) Cipher {
	if len(key) == 0 {
		return nil
	}

	allA := true
	for _, x := range key {
		if x < 'a' || x > 'z' {
			return nil
		}
		if x != 'a' {
			allA = false
			break
		}
	}

	if allA {
		return nil
	}

	return vigenere{key: key}
}