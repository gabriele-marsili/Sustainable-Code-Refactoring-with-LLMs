package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	if len(plainText) == 0 {
		return ""
	}
	
	encoded := make([]rune, 0, len(plainText))
	
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			encoded = append(encoded, shifted)
		}
	}
	
	if len(encoded) == 0 {
		return ""
	}
	
	groups := (len(encoded) + 4) / 5
	result := make([]rune, 0, len(encoded)+groups-1)
	
	for i, char := range encoded {
		if i > 0 && i%5 == 0 {
			result = append(result, ' ')
		}
		result = append(result, char)
	}
	
	return string(result)
}

/*encode swaps positions of letter in the alphabet (a to z, b to y, c to x, etc)
return digits and returns space for everything else.*/
func encode(char rune) rune {
	switch {
	case 'a' <= char && char <= 'z':
		return 'z' - char + 'a'
	case 'A' <= char && char <= 'Z':
		return 'z' - (char - 'A')
	case '0' <= char && char <= '9':
		return char
	default:
		return ' '
	}
}