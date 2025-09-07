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
func shiftchar(r rune) rune {
	if r > 'z' { // if we fall right-side of z
		return r - 26 // wrap back left into a-z range
	} else if r < 'a' { // if we fall left-side of a
		return r + 26 // wrap back right into a-z range
	}
	return r // keep as is
}

// Cleans garbage out of input like spaces, non a-z etc.
func cleaninput(input string) string {
	var sb strings.Builder
	sb.Grow(len(input)) // Pre-allocate memory
	for _, r := range input { // for each character in input
		r = unicode.ToLower(r) // normalize to lowercase
		if r >= 'a' && r <= 'z' { // only accepts a-z
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
	for _, r := range input { // for each character in clean input
		newChar := r + rune(c.distance) // Add since encode
		sb.WriteRune(shiftchar(newChar))
	}
	return sb.String()
}

func (c shift) Decode(input string) string {
	var sb strings.Builder
	sb.Grow(len(input))
	for _, r := range input { // for each character in input
		newChar := r - rune(c.distance) // Subtract since decode
		sb.WriteRune(shiftchar(newChar))
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
	properKey := propervignerekey(input, v.key)

	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var sb strings.Builder
	sb.Grow(len(input))
	for i, r := range input {
		keyChar := properKey[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			sb.WriteRune(r)
		} else { // Non 'a' key
			c := shift{distance: int(keyChar - 'a')} // Set shift distance for cipher
			sb.WriteString(c.Encode(string(r)))      // Add encoded character to output
		}
	}
	return sb.String()
}

func (v vigenere) Decode(input string) string {
	// 1. Use the length of input to generate key with proper length
	properKey := propervignerekey(input, v.key)
	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var sb strings.Builder
	sb.Grow(len(input))
	for i, r := range input {
		keyChar := properKey[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			sb.WriteRune(r)
		} else { // Non 'a' key
			c := shift{distance: int(keyChar - 'a')} // Set shift distance for cipher
			sb.WriteString(c.Decode(string(r)))      // Add encoded character to output
		}
	}
	return sb.String()
}

// Functions
func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	if distance <= -26 || distance >= 26 || distance == 0 {
		return nil
	}
	return shift{distance: distance}
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
	for _, r := range key {
		if r < 'a' || r > 'z' {
			return nil
		}
		if r != 'a' {
			allA = false
			break
		}
	}

	if allA {
		return nil
	}

	return vigenere{key: key}
}