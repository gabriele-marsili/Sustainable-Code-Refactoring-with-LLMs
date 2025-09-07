package atbash

import (
	"strings"
	"unicode"
)

func CalculateCipher(char rune) rune {
	return 'a' + 'z' - char
}

func Atbash(s string) string {
	var sb strings.Builder
	sb.Grow(len(s)) // Pre-allocate memory

	count := 0
	for _, r := range s {
		lower := unicode.ToLower(r)
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			if count == 5 {
				sb.WriteByte(' ')
				count = 0
			}

			if unicode.IsLetter(r) {
				sb.WriteRune(CalculateCipher(lower))
			} else {
				sb.WriteRune(r)
			}
			count++
		}
	}
	return sb.String()
}