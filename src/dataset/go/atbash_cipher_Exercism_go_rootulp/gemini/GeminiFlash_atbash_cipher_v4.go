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
	sb.Grow(len(message) + len(message)/5) // Pre-allocate for efficiency

	count := 0
	for _, r := range message {
		if unicode.IsLetter(r) {
			if count > 0 && count%5 == 0 {
				sb.WriteRune(' ')
			}
			sb.WriteRune(atbash[r-'a'])
			count++
		} else if unicode.IsDigit(r) {
			if count > 0 && count%5 == 0 {
				sb.WriteRune(' ')
			}
			sb.WriteRune(r)
			count++
		}
	}
	return sb.String()
}