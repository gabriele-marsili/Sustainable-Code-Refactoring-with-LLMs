package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	if len(plainText) == 0 {
		return ""
	}
	
	// Pre-allocate with estimated capacity to reduce allocations
	result := make([]rune, 0, len(plainText)+len(plainText)/5)
	count := 0
	
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			if count > 0 && count%5 == 0 {
				result = append(result, ' ')
			}
			result = append(result, shifted)
			count++
		}
	}
	
	return string(result)
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