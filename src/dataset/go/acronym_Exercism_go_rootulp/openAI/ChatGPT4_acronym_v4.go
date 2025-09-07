package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var acronym strings.Builder
	for _, r := range s {
		if unicode.IsLetter(r) {
			acronym.WriteRune(unicode.ToUpper(r))
			for r != ' ' && r != '-' && r != 0 {
				r = nextRune(&s)
			}
		}
	}
	return acronym.String()
}

func nextRune(s *string) rune {
	if len(*s) == 0 {
		return 0
	}
	r, size := utf8.DecodeRuneInString(*s)
	*s = (*s)[size:]
	return r
}