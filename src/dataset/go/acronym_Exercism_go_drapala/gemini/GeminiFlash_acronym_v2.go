package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-'
	})

	var result strings.Builder
	result.Grow(len(words)) // Pre-allocate memory

	for _, word := range words {
		for _, r := range word {
			if unicode.IsLetter(r) {
				result.WriteRune(unicode.ToUpper(r))
				break // Only take the first letter
			}
		}
	}

	return result.String()
}