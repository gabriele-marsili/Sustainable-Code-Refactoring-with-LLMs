package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	plainText = strings.ToLower(plainText)
	result := make([]byte, 0, len(plainText))
	count := 0
	for i := 0; i < len(plainText); i++ {
		char := plainText[i]
		if encodedChar := encode(rune(char)); encodedChar != ' ' {
			result = append(result, byte(encodedChar))
			count++
			if count%5 == 0 {
				result = append(result, ' ')
			}
		}
	}
	if len(result) > 0 && result[len(result)-1] == ' ' {
		return string(result[:len(result)-1])
	}
	return string(result)
}

/*encode swaps positions of letter in the alphabet (a to z, b to y, c to x, etc)
return digits and returns space for everything else.*/
func encode(char rune) rune {
	if 'a' <= char && char <= 'z' {
		return 'z' - char + 'a'
	} else if '0' <= char && char <= '9' {
		return char
	}
	return ' '
}