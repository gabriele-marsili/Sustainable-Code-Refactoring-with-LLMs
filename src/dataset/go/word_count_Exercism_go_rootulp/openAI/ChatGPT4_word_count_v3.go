package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	for _, word := range strings.FieldsFunc(phrase, splitRune) {
		word = strings.ToLower(strings.Trim(word, "'"))
		if containsLetterOrNumber(word) {
			result[word]++
		}
	}
	return result
}

func splitRune(c rune) bool {
	return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
}

func containsLetterOrNumber(word string) bool {
	for _, c := range word {
		if unicode.IsLetter(c) || unicode.IsNumber(c) {
			return true
		}
	}
	return false
}