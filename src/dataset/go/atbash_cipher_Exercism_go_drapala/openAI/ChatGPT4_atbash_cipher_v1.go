package atbash

import (
	"strings"
	"unicode"
)

func CalculateCipher(char rune) rune {
	return 'a' + ('z' - char)
}

func Atbash(s string) string {
	var output strings.Builder
	output.Grow(len(s)) // Preallocate memory for efficiency
	count := 0

	for _, char := range s {
		lower := unicode.ToLower(char)
		if (lower >= 'a' && lower <= 'z') || (lower >= '0' && lower <= '9') {
			if count == 5 {
				output.WriteByte(' ')
				count = 0
			}
			if lower >= 'a' && lower <= 'z' {
				output.WriteRune(CalculateCipher(lower))
			} else {
				output.WriteRune(char)
			}
			count++
		}
	}
	return output.String()
}