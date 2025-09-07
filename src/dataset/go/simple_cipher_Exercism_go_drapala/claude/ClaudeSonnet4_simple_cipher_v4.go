package cipher

import (
	"math"
	"strings"
	"unicode"
)

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
	var builder strings.Builder
	builder.Grow(len(input))
	for _, x := range input {
		if x >= 'A' && x <= 'Z' {
			builder.WriteRune(x + 32)
		} else if x >= 'a' && x <= 'z' {
			builder.WriteRune(x)
		}
	}
	return builder.String()
}

func (c shift) Encode(input string) string {
	input = cleaninput(input)
	if len(input) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(input))
	distance := rune(c.distance)
	
	for _, x := range input {
		builder.WriteRune(shiftchar(x + distance))
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
	
	for _, x := range input {
		builder.WriteRune(shiftchar(x - distance))
	}
	return builder.String()
}

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
	input = cleaninput(input)
	if len(input) == 0 {
		return ""
	}
	
	properKey := propervignerekey(len(input), v.key)
	var builder strings.Builder
	builder.Grow(len(input))
	
	for i, x := range input {
		keyChar := properKey[i]
		if keyChar == 'a' {
			builder.WriteRune(x)
		} else {
			distance := rune(keyChar - 'a')
			builder.WriteRune(shiftchar(x + distance))
		}
	}
	return builder.String()
}

func (v vigenere) Decode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	properKey := propervignerekey(len(input), v.key)
	var builder strings.Builder
	builder.Grow(len(input))
	
	for i, x := range input {
		keyChar := properKey[i]
		if keyChar == 'a' {
			builder.WriteRune(x)
		} else {
			distance := rune(keyChar - 'a')
			builder.WriteRune(shiftchar(x - distance))
		}
	}
	return builder.String()
}

func NewCaesar() Cipher {
	return shift{distance: 3}
}

func NewShift(distance int) Cipher {
	absDistance := distance
	if absDistance < 0 {
		absDistance = -absDistance
	}
	if absDistance >= 1 && absDistance <= 25 {
		return shift{distance: distance}
	}
	return nil
}

func NewVigenere(key string) Cipher {
	if len(key) == 0 {
		return nil
	}
	
	allA := true
	for _, x := range key {
		if !unicode.IsLower(x) || x < 'a' || x > 'z' {
			return nil
		}
		if x != 'a' {
			allA = false
		}
	}
	
	if allA {
		return nil
	}
	
	return vigenere{key: key}
}