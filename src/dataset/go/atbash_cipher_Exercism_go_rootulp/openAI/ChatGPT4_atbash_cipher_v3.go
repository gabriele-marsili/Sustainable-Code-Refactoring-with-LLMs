package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) (ciphertext string) {
	var builder strings.Builder
	processed := removeNonAlphanumeric(strings.ToLower(message))
	for _, r := range processed {
		builder.WriteRune(encode(r))
	}
	return strings.Join(splitEveryN(builder.String(), 5), " ")
}

func removeNonAlphanumeric(s string) string {
	var builder strings.Builder
	for _, r := range s {
		if unicode.IsDigit(r) || unicode.IsLetter(r) {
			builder.WriteRune(r)
		}
	}
	return builder.String()
}

func splitEveryN(message string, n int) []string {
	length := len(message)
	groups := make([]string, 0, (length+n-1)/n)
	for i := 0; i < length; i += n {
		end := i + n
		if end > length {
			end = length
		}
		groups = append(groups, message[i:end])
	}
	return groups
}

func encode(r rune) rune {
	if unicode.IsLetter(r) {
		return 'z' - (r - 'a')
	}
	return r
}