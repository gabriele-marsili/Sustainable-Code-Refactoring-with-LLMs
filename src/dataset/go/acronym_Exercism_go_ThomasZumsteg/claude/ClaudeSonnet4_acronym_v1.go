package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var acronym strings.Builder
	acronym.Grow(len(s) / 4) // Pre-allocate reasonable capacity
	
	inWord := false
	for _, r := range s {
		if r == ' ' || r == '-' {
			inWord = false
		} else if !inWord {
			acronym.WriteRune(unicode.ToUpper(r))
			inWord = true
		}
	}
	return acronym.String()
}

func SplitAny(s string, seps []string) []string {
	if len(s) == 0 {
		return nil
	}
	
	// Create separator lookup map for O(1) access
	sepMap := make(map[rune]bool, len(seps))
	for _, sep := range seps {
		if len(sep) > 0 {
			sepMap[rune(sep[0])] = true
		}
	}
	
	result := make([]string, 0, strings.Count(s, " ")+strings.Count(s, "-")+1)
	var word strings.Builder
	
	for _, r := range s {
		if sepMap[r] {
			if word.Len() > 0 {
				result = append(result, word.String())
				word.Reset()
			}
		} else {
			word.WriteRune(r)
		}
	}
	
	if word.Len() > 0 {
		result = append(result, word.String())
	}
	
	return result
}