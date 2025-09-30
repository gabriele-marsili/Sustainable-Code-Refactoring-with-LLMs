package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate should return an abbreviated string based on s.
func Abbreviate(s string) string {
	var result strings.Builder
	result.Grow(len(s) / 4) // Pre-allocate reasonable capacity
	
	inWord := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			if !inWord {
				result.WriteRune(unicode.ToUpper(r))
				inWord = true
			}
		} else if r == '-' || r == ' ' {
			inWord = false
		} else {
			inWord = false
		}
	}
	
	return result.String()
}

// Return a string that is generated from the first letter of each word in s.
func generateAcronym(s string) string {
	result := ""
	for _, v := range strings.Fields(s) {
		result += v[:1]
	}
	return result
}

func parse(s string) string {
	return strings.Map(func(r rune) rune {
		if r == '-' || r == ' ' {
			return ' '
		} else if unicode.IsLetter(r) {
			return r
		} else {
			return -1
		}
	}, s)
}