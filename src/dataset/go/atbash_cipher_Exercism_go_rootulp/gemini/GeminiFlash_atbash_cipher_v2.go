package atbash

import (
	"strings"
	"unicode"
)

const (
	plainAlphabet  = "abcdefghijklmnopqrstuvwxyz"
	cipherAlphabet = "zyxwvutsrqponmlkjihgfedcba"
)

func Atbash(message string) string {
	message = strings.ToLower(message)
	var sb strings.Builder
	count := 0

	for _, r := range message {
		if unicode.IsLetter(r) {
			sb.WriteByte(cipherAlphabet[r-'a'])
			count++
		} else if unicode.IsDigit(r) {
			sb.WriteRune(r)
			count++
		}

		if count == 5 {
			sb.WriteByte(' ')
			count = 0
		}
	}

	result := sb.String()
	if len(result) > 0 && result[len(result)-1] == ' ' {
		return result[:len(result)-1]
	}
	return result
}