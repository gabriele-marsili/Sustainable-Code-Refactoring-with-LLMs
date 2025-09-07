package wordcount

import (
	"strings"
	"unicode"
)

const TestVersion = 1

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	if len(phrase) == 0 {
		return make(Frequency)
	}
	
	counter := make(Frequency)
	var word strings.Builder
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word.WriteRune(unicode.ToLower(r))
		} else if word.Len() > 0 {
			counter[word.String()]++
			word.Reset()
		}
	}
	
	if word.Len() > 0 {
		counter[word.String()]++
	}
	
	return counter
}

func splitWords(phrase string) []string {
	if len(phrase) == 0 {
		return nil
	}
	
	words := make([]string, 0, estimateWordCount(phrase))
	var word strings.Builder
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word.WriteRune(unicode.ToLower(r))
		} else if word.Len() > 0 {
			words = append(words, word.String())
			word.Reset()
		}
	}
	
	if word.Len() > 0 {
		words = append(words, word.String())
	}
	
	return words
}

func estimateWordCount(phrase string) int {
	if len(phrase) == 0 {
		return 0
	}
	return len(phrase)/5 + 1
}