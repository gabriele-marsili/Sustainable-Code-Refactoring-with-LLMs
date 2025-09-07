package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	words := strings.FieldsFunc(phrase, func(c rune) bool {
		return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
	})
	for _, word := range words {
		normalizedWord := strings.Trim(strings.ToLower(word), "'")
		if hasLetterOrNumber(normalizedWord) {
			result[normalizedWord]++
		}
	}
	return result
}

func hasLetterOrNumber(word string) bool {
	for _, c := range word {
		if unicode.IsLetter(c) || unicode.IsNumber(c) {
			return true
		}
	}
	return false
}