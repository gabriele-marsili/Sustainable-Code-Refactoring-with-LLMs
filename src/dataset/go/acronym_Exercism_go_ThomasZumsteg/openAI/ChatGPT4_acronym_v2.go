package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var acronym strings.Builder
	acronym.Grow(len(s)) // Preallocate memory for potential acronym length
	inWord := false

	for _, char := range s {
		if unicode.IsLetter(char) {
			if !inWord {
				acronym.WriteRune(unicode.ToUpper(char))
				inWord = true
			}
		} else {
			inWord = false
		}
	}
	return acronym.String()
}