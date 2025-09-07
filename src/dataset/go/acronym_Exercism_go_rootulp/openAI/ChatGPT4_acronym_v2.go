package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var acronym strings.Builder
	prevIsDelimiter := true

	for _, r := range s {
		if unicode.IsLetter(r) {
			if prevIsDelimiter {
				acronym.WriteRune(unicode.ToUpper(r))
			}
			prevIsDelimiter = false
		} else {
			prevIsDelimiter = r == '-' || unicode.IsSpace(r)
		}
	}

	return acronym.String()
}