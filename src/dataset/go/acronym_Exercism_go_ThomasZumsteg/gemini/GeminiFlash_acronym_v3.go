package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var acronym strings.Builder
	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-'
	})

	for _, word := range words {
		if len(word) > 0 {
			firstChar := rune(word[0])
			acronym.WriteRune(unicode.ToUpper(firstChar))
		}
	}

	return acronym.String()
}