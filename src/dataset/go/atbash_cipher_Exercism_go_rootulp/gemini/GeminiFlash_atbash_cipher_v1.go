package atbash

import (
	"strings"
	"unicode"
)

const (
	atbashAlphabet = "zyxwvutsrqponmlkjihgfedcba"
	groupSize      = 5
)

func Atbash(message string) string {
	message = strings.ToLower(message)
	var sb strings.Builder
	count := 0

	for _, r := range message {
		if unicode.IsLetter(r) {
			sb.WriteByte(atbashAlphabet[r-'a'])
			count++
		} else if unicode.IsDigit(r) {
			sb.WriteRune(r)
			count++
		}

		if count == groupSize {
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