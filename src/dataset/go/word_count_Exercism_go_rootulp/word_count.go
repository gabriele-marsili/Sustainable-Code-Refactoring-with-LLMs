package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) (result Frequency) {
	result = make(Frequency)
	
	var word strings.Builder
	word.Grow(32) // Pre-allocate reasonable capacity
	
	hasLetterOrNumber := false
	
	for _, r := range phrase {
		if unicode.IsSpace(r) || (unicode.IsPunct(r) && r != '\'') {
			if hasLetterOrNumber && word.Len() > 0 {
				w := strings.ToLower(strings.Trim(word.String(), "'"))
				result[w]++
			}
			word.Reset()
			hasLetterOrNumber = false
		} else {
			word.WriteRune(r)
			if !hasLetterOrNumber && (unicode.IsLetter(r) || unicode.IsNumber(r)) {
				hasLetterOrNumber = true
			}
		}
	}
	
	// Handle last word
	if hasLetterOrNumber && word.Len() > 0 {
		w := strings.ToLower(strings.Trim(word.String(), "'"))
		result[w]++
	}
	
	return result
}

func splitStringOnWhitespaceAndPunctuation(phrase string) []string {
	splitter := func(c rune) bool {
		return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
	}
	return strings.FieldsFunc(phrase, splitter)
}

func doesContainsLetterOrNumber(word string) bool {
	for _, r := range word {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			return true
		}
	}
	return false
}