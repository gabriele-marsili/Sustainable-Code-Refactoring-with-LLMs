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
	sb.Grow(len(s)) // Pre-allocate memory to avoid reallocations
	count := 0

	for _, char := range s {
		lower := unicode.ToLower(char)

		if unicode.IsLetter(lower) || unicode.IsDigit(lower) {
			if count == 5 {
				sb.WriteByte(' ')
				count = 0
			}

			if unicode.IsLetter(lower) {
				sb.WriteRune(CalculateCipher(lower))
			} else {
				sb.WriteRune(char)
			}
			count++
		}
	}
	return sb.String()
}