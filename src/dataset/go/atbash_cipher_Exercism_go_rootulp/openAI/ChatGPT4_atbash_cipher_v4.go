package atbash

import (
	"strings"
	"unicode"
)

var atbash = [26]rune{
	'z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q',
	'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g',
	'f', 'e', 'd', 'c', 'b', 'a',
}

func Atbash(message string) string {
	var builder strings.Builder
	var count int

	for _, r := range message {
		if unicode.IsLetter(r) {
			r = unicode.ToLower(r)
			builder.WriteRune(atbash[r-'a'])
			count++
		} else if unicode.IsDigit(r) {
			builder.WriteRune(r)
			count++
		}

		if count%5 == 0 && count > 0 {
			builder.WriteRune(' ')
		}
	}

	result := builder.String()
	if len(result) > 0 && result[len(result)-1] == ' ' {
		result = result[:len(result)-1]
	}
	return result
}