package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(s) / 4) // Pre-allocate reasonable capacity
	
	inWord := false
	for _, r := range s {
		if r == ' ' || r == '-' {
			inWord = false
		} else if !inWord {
			result.WriteRune(unicode.ToUpper(r))
			inWord = true
		}
	}
	
	return result.String()
}

func SplitAny(s string, seps []string) []string {
	if len(s) == 0 {
		return nil
	}
	
	sepMap := make(map[rune]bool, len(seps))
	for _, sep := range seps {
		if len(sep) > 0 {
			sepMap[rune(sep[0])] = true
		}
	}
	
	var result []string
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