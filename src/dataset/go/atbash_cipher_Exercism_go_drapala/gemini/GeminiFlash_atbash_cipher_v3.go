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
	sb.Grow(len(s))
	count := 0

	for _, char := range s {
		lower := unicode.ToLower(char)
		if (lower >= 'a' && lower <= 'z') || (lower >= '0' && lower <= '9') {
			if count == 5 {
				sb.WriteByte(' ')
				count = 0
			}
			if lower >= 'a' && lower <= 'z' {
				sb.WriteRune(CalculateCipher(lower))
			} else {
				sb.WriteRune(char)
			}
			count++
		}
	}
	return sb.String()
}