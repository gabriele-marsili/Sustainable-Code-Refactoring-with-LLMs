package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var acronym strings.Builder
	for _, word := range strings.FieldsFunc(s, splitFunc) {
		if len(word) > 0 {
			acronym.WriteByte(word[0])
		}
	}
	return strings.ToUpper(acronym.String())
}

func splitFunc(r rune) bool {
	return r == '-' || r == ' ' || !unicode.IsLetter(r)
}