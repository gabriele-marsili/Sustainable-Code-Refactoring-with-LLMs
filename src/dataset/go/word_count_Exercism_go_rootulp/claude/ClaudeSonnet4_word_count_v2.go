package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	
	var word strings.Builder
	var hasAlphaNum bool
	
	for _, r := range phrase {
		if unicode.IsSpace(r) || (unicode.IsPunct(r) && r != '\'') {
			if hasAlphaNum && word.Len() > 0 {
				wordStr := strings.Trim(word.String(), "'")
				if wordStr != "" {
					result[wordStr]++
				}
			}
			word.Reset()
			hasAlphaNum = false
		} else {
			if unicode.IsLetter(r) || unicode.IsNumber(r) {
				hasAlphaNum = true
				word.WriteRune(unicode.ToLower(r))
			} else {
				word.WriteRune(r)
			}
		}
	}
	
	if hasAlphaNum && word.Len() > 0 {
		wordStr := strings.Trim(word.String(), "'")
		if wordStr != "" {
			result[wordStr]++
		}
	}
	
	return result
}