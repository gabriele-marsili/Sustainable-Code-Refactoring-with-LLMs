package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var result strings.Builder
	inWord := false
	
	for _, r := range s {
		if r == '-' || unicode.IsSpace(r) {
			inWord = false
		} else if !inWord && unicode.IsLetter(r) {
			result.WriteRune(unicode.ToUpper(r))
			inWord = true
		}
	}
	
	return result.String()
}