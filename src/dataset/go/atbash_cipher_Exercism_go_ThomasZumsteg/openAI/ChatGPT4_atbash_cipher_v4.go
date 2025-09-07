package atbash

import (
	"strings"
)

func Atbash(plainText string) string {
	var cipherText strings.Builder
	count := 0
	for _, char := range plainText {
		shifted := encode(char)
		if shifted != ' ' {
			cipherText.WriteRune(shifted)
			count++
			if count%5 == 0 {
				cipherText.WriteByte(' ')
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
	if 'a' <= char && char <= 'z' {
		return 'z' - char + 'a'
	}
	if 'A' <= char && char <= 'Z' {
		return 'Z' - char + 'a'
	}
	if '0' <= char && char <= '9' {
		return char
	}
	return ' '
}