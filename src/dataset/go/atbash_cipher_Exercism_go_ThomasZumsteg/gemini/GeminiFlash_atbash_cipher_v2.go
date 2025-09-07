package atbash

import (
	"strings"
)

/*Atbash encrypts a string using an atbash cipher and groups the resulting text.*/
func Atbash(plainText string) string {
	plainText = strings.ToLower(plainText)
	result := make([]rune, 0, len(plainText))
	count := 0

	for _, char := range plainText {
		if 'a' <= char && char <= 'z' {
			result = append(result, 'z'-char+'a')
			count++
		} else if '0' <= char && char <= '9' {
			result = append(result, char)
			count++
		}

		if count == 5 {
			result = append(result, ' ')
			count = 0
		}
	}

	if len(result) > 0 && result[len(result)-1] == ' ' {
		return string(result[:len(result)-1])
	}
	return string(result)
}