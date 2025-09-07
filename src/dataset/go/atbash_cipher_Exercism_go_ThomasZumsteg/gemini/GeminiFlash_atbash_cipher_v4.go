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
		char := rune(plainText[i])
		var encoded rune
		switch {
		case 'a' <= char && char <= 'z':
			encoded = 'z' - char + 'a'
		case '0' <= char && char <= '9':
			encoded = char
		default:
			continue
		}

		result = append(result, byte(encoded))
		count++

		if count%5 == 0 {
			result = append(result, ' ')
		}
	}

	if len(result) > 0 && result[len(result)-1] == ' ' {
		return string(result[:len(result)-1])
	}
	return string(result)
}