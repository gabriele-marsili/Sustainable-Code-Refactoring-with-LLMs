package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) (result Frequency) {
	if len(phrase) == 0 {
		return Frequency{}
	}
	
	result = make(Frequency)
	var word strings.Builder
	word.Grow(32)
	
	for _, r := range phrase {
		if unicode.IsSpace(r) || (unicode.IsPunct(r) && r != '\'') {
			if word.Len() > 0 {
				processWord(&word, result)
			}
		} else {
			word.WriteRune(r)
		}
	}
	
	if word.Len() > 0 {
		processWord(&word, result)
	}
	
	return result
}

func processWord(word *strings.Builder, result Frequency) {
	s := word.String()
	if containsLetterOrNumber(s) {
		key := strings.ToLower(strings.Trim(s, "'"))
		result[key]++
	}
	word.Reset()
}

func splitStringOnWhitespaceAndPunctuation(phrase string) []string {
	splitter := func(c rune) bool {
		return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
	}
	return strings.FieldsFunc(phrase, splitter)
}

func doesContainsLetterOrNumber(word string) bool {
	return containsLetterOrNumber(word)
}

func containsLetterOrNumber(word string) bool {
	for _, r := range word {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			return true
		}
	}
	return false
}