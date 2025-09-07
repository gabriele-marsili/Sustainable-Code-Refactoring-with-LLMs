package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) string {
	var builder strings.Builder
	var groupBuilder strings.Builder
	count := 0

	for _, r := range message {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			r = unicode.ToLower(r)
			if unicode.IsLetter(r) {
				r = 'z' - (r - 'a')
			}
			builder.WriteRune(r)
			groupBuilder.WriteRune(r)
			count++
			if count%5 == 0 {
				groupBuilder.WriteRune(' ')
			}
		}
	}

	result := groupBuilder.String()
	if len(result) > 0 && result[len(result)-1] == ' ' {
		result = result[:len(result)-1]
	}
	return result
}