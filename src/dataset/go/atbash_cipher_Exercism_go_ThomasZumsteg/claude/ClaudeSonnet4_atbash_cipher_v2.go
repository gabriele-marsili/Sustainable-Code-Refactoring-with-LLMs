package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	var result strings.Builder
	result.Grow(len(plainText) + len(plainText)/5) // Pre-allocate capacity
	
	charCount := 0
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			if charCount > 0 && charCount%5 == 0 {
				result.WriteByte(' ')
			}
			result.WriteRune(shifted)
			charCount++
		}
	}
	return result.String()
}

/*encode swaps positions of letter in the alphabet (a to z, b to y, c to x, etc)
return digits and returns space for everything else.*/
func encode(char rune) rune {
	if char >= 'a' && char <= 'z' {
		return 'z' - char + 'a'
	}
	if char >= 'A' && char <= 'Z' {
		return 'z' - (char - 'A')
	}
	if char >= '0' && char <= '9' {
		return char
	}
	return ' '
}