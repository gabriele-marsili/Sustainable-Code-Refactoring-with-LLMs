package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	s = strings.ReplaceAll(s, "-", " ")
	words := strings.Fields(s)
	acronym := strings.Builder{}
	acronym.Grow(len(words)) // Pre-allocate memory

	for _, word := range words {
		if len(word) > 0 {
			firstChar := rune(word[0])
			acronym.WriteRune(unicode.ToUpper(firstChar))
		}
	}
	return acronym.String()
}