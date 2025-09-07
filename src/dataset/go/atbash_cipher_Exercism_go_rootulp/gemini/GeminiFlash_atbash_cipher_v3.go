package atbash

import (
	"strings"
	"unicode"
)

var atbash = [26]rune{
	'z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a',
}

func Atbash(message string) string {
	message = strings.ToLower(message)
	var sb strings.Builder
	count := 0
	for _, r := range message {
		if unicode.IsLetter(r) {
			sb.WriteRune(atbash[r-'a'])
			count++
		} else if unicode.IsDigit(r) {
			sb.WriteRune(r)
			count++
		}

		if count == 5 {
			sb.WriteRune(' ')
			count = 0
		}
	}

	result := sb.String()
	if len(result) > 0 && result[len(result)-1] == ' ' {
		return result[:len(result)-1]
	}
	return result
}