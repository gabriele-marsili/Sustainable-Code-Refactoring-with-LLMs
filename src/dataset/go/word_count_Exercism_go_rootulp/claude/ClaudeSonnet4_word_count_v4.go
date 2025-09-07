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
	
	result = make(Frequency, 16)
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
	word.Reset()
	
	hasAlphaNum := false
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			hasAlphaNum = true
			break
		}
	}
	
	if hasAlphaNum {
		key := strings.Trim(strings.ToLower(s), "'")
		result[key]++
	}
}

func splitStringOnWhitespaceAndPunctuation(phrase string) []string {
	splitter := func(c rune) bool {
		return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
	}
	return strings.FieldsFunc(phrase, splitter)
}

func doesContainsLetterOrNumber(word string) bool {
	containsLetterOrNumber := func(c rune) bool {
		return unicode.IsLetter(c) || unicode.IsNumber(c)
	}
	return strings.IndexFunc(word, containsLetterOrNumber) != -1
}