package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var sb strings.Builder
	sb.Grow(len(s) / 2) // Pre-allocate space for the acronym

	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-'
	})

	for _, word := range words {
		if len(word) > 0 {
			sb.WriteRune(unicode.ToUpper(rune(word[0])))
		}
	}

	return sb.String()
}