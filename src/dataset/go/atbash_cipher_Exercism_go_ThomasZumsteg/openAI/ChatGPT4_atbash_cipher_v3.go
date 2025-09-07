package atbash

import (
	"strings"
)

func Atbash(plainText string) string {
	var cipherText strings.Builder
	cipherText.Grow(len(plainText) + len(plainText)/5)

	groupCount := 0
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			cipherText.WriteRune(shifted)
			groupCount++
			if groupCount%5 == 0 {
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