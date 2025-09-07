package cipher

import (
	"unicode"
)

// Shift
type shift struct {
	distance int
}

func shiftchar(newchar rune) rune {
	if newchar > 'z' {
		return newchar - 26
	} else if newchar < 'a' {
		return newchar + 26
	}
	return newchar
}

func cleaninput(input string) string {
	var clean []rune
	for _, x := range input {
		x = unicode.ToLower(x)
		if x >= 'a' && x <= 'z' {
			clean = append(clean, x)
		}
	}
	return string(clean)
}

func (c shift) Encode(input string) string {
	input = cleaninput(input)
	output := make([]rune, len(input))
	for i, x := range input {
		output[i] = shiftchar(x + rune(c.distance))
	}
	return string(output)
}

func (c shift) Decode(input string) string {
	output := make([]rune, len(input))
	for i, x := range input {
		output[i] = shiftchar(x - rune(c.distance))
	}
	return string(output)
}

// Vigenere
type vigenere struct {
	key string
}

func propervignerekey(input, key string) string {
	keyLen := len(key)
	properKey := make([]rune, len(input))
	for i := range input {
		properKey[i] = rune(key[i%keyLen])
	}
	return string(properKey)
}

func (v vigenere) Encode(input string) string {
	input = cleaninput(input)
	properKey := propervignerekey(input, v.key)
	output := make([]rune, len(input))
	for i, x := range input {
		shiftDistance := properKey[i] - 'a'
		output[i] = shiftchar(x + shiftDistance)
	}
	return string(output)
}

func (v vigenere) Decode(input string) string {
	properKey := propervignerekey(input, v.key)
	output := make([]rune, len(input))
	for i, x := range input {
		shiftDistance := properKey[i] - 'a'
		output[i] = shiftchar(x - shiftDistance)
	}
	return string(output)
}

// Functions
func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	if distance < 1 || distance > 25 {
		return nil
	}
	return shift{distance: distance}
}

func NewVigenere(key string) Cipher {
	if len(key) == 0 {
		return nil
	}
	for _, x := range key {
		if x < 'a' || x > 'z' {
			return nil
		}
		if x != 'a' {
			return vigenere{key: key}
		}
	}
	return nil
}