package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	phrase = strings.ToLower(phrase)
	words := splitStringOnWhitespaceAndPunctuation(phrase)
	for _, word := range words {
		word = strings.Trim(word, "'")
		if containsLetterOrNumber(word) {
			result[word]++
		}
	}
	return result
}

func splitStringOnWhitespaceAndPunctuation(phrase string) []string {
	f := func(r rune) bool {
		return unicode.IsSpace(r) || (unicode.IsPunct(r) && r != '\'')
	}
	return strings.FieldsFunc(phrase, f)
}

func containsLetterOrNumber(s string) bool {
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			return true
		}
	}
	return false
}