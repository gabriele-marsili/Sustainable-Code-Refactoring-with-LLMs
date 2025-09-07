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
	var builder strings.Builder
	builder.Grow(len(input)) // Pre-allocate capacity
	for _, x := range input { // for each character in input
		if x >= 'A' && x <= 'Z' {
			builder.WriteRune(x + 32) // Convert to lowercase directly
		} else if x >= 'a' && x <= 'z' {
			builder.WriteRune(x)
		}
	}
	return builder.String()
}

// Note:
// 1. Encode will ignore all values in the string that are not A-Za-z.
// 2. The output will be also normalized to lowercase.
func (c shift) Encode(input string) string {
	input = cleaninput(input)
	if len(input) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(input))
	distance := rune(c.distance)
	
	for _, x := range input { // for each character in clean input
		newchar := x + distance // Add since encode
		builder.WriteRune(shiftchar(newchar))
	}
	return builder.String()
}

func (c shift) Decode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(input))
	distance := rune(c.distance)
	
	for _, x := range input { // for each character in input
		newchar := x - distance // Subtract since decode
		builder.WriteRune(shiftchar(newchar))
	}
	return builder.String()
}

// Vigenere
type vigenere struct {
	key string
}

func propervignerekey(inputLen int, key string) string {
	if inputLen <= len(key) {
		return key[:inputLen]
	}
	
	var builder strings.Builder
	builder.Grow(inputLen)
	keyLen := len(key)
	
	for i := 0; i < inputLen; i++ {
		builder.WriteByte(key[i%keyLen])
	}
	return builder.String()
}

func (v vigenere) Encode(input string) string {
	input = cleaninput(input) // Clean input so our key is clean
	if len(input) == 0 {
		return ""
	}

	// 1. Use the length of input to generate key with proper length
	proper_key := propervignerekey(len(input), v.key)

	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var builder strings.Builder
	builder.Grow(len(input))
	
	for i, x := range input {
		keyChar := proper_key[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			builder.WriteRune(x)
		} else { // Non 'a' key
			distance := rune(keyChar - 'a')
			newchar := x + distance
			builder.WriteRune(shiftchar(newchar))
		}
	}
	return builder.String()
}

func (v vigenere) Decode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	// 1. Use the length of input to generate key with proper length
	proper_key := propervignerekey(len(input), v.key)
	
	// 2. Create a shift cipher per key, for per rune, and aggregate the output
	var builder strings.Builder
	builder.Grow(len(input))
	
	for i, x := range input {
		keyChar := proper_key[i]
		if keyChar == 'a' { // It's possible to have a zero shift as long as it's not ALL a's
			builder.WriteRune(x)
		} else { // Non 'a' key
			distance := rune(keyChar - 'a')
			newchar := x - distance
			builder.WriteRune(shiftchar(newchar))
		}
	}
	return builder.String()
}

// Functions
func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	if distance >= -25 && distance <= 25 && distance != 0 { // Valid shift distance
		return shift{distance: distance}
	}
	return nil // Invalid shift distance
}

// Note:
// 1. Argument for NewVigenere must consist of lower case letters a-z only. 
// 2. Values consisting entirely of the letter 'a' are disallowed. 

// For invalid arguments NewVigenere returns nil.
func NewVigenere(key string) Cipher {
	if len(key) == 0 {
		return nil
	}

	all_a := true // For keeping track of all a's 
	// 1. Argument for NewVigenere must consist of lower case letters a-z only. 
	for _, x := range key {
		if x < 'a' || x > 'z' { // Not in a-z or not lowercase
			return nil
		}
		if x != 'a' { // Not all a's
			all_a = false
		}
	}
	// 2. Values consisting entirely of the letter 'a' are disallowed. 
	if all_a {
		return nil
	}
	// Key is valid
	return vigenere{key: key}
}