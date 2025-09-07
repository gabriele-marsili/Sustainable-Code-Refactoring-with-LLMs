package atbash

import (
	"strings"
	"unicode"
)

func CalculateCipher(char rune) rune {
	return 'z' - (char - 'a')
}

func Atbash(s string) string {
	var builder strings.Builder
	builder.Grow(len(s))
	count := 0

	for _, char := range s {
		lower := unicode.ToLower(char)
		if (lower >= 'a' && lower <= 'z') || (lower >= '0' && lower <= '9') {
			if count == 5 {
				builder.WriteByte(' ')
				count = 0
			}
			if lower >= 'a' && lower <= 'z' {
				builder.WriteRune(CalculateCipher(lower))
			} else {
				builder.WriteRune(char)
			}
			count++
		}
	}
	return builder.String()
}