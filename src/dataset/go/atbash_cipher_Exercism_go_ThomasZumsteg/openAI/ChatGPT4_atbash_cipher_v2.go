package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	var cipherText strings.Builder
	count := 0

	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			cipherText.WriteRune(shifted)
			count++
			if count%5 == 0 {
				cipherText.WriteRune(' ')
			}
		}
	}

	result := cipherText.String()
	if len(result) > 0 && result[len(result)-1] == ' ' {
		return result[:len(result)-1]
	}
	return result
}

/*encode swaps positions of letter in the alphabet (a to z, b to y, c to x, etc)
return digits and returns space for everything else.*/
func encode(char rune) rune {
	switch {
	case 'a' <= char && char <= 'z':
		return 'z' - char + 'a'
	case 'A' <= char && char <= 'Z':
		return 'Z' - char + 'a'
	case '0' <= char && char <= '9':
		return char
	default:
		return ' '
	}
}