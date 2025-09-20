package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) (ciphertext string) {
	var builder strings.Builder
	alphanumeric := make([]rune, 0, len(message))

	for _, r := range strings.ToLower(message) {
		if unicode.IsDigit(r) || unicode.IsLetter(r) {
			alphanumeric = append(alphanumeric, r)
		}
	}

	for _, r := range alphanumeric {
		builder.WriteRune(encode(r))
	}

	ciphertext = builder.String()
	return strings.Join(splitEveryN(ciphertext, 5), " ")
}

func splitEveryN(message string, n int) (groups []string) {
	length := len(message)
	groups = make([]string, 0, (length+n-1)/n)

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