package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var result strings.Builder
	wordStart := true

	for _, r := range s {
		if unicode.IsLetter(r) {
			if wordStart {
				result.WriteRune(unicode.ToUpper(r))
				wordStart = false
			}
		} else if r == ' ' || r == '-' {
			wordStart = true
		}
	}

	return result.String()
}