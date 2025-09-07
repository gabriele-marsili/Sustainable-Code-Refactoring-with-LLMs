package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var result strings.Builder
	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-'
	})

	for _, word := range words {
		for _, r := range word {
			if unicode.IsLetter(r) {
				result.WriteRune(unicode.ToUpper(r))
				break
			}
		}
	}
	return result.String()
}