package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	for _, word := range strings.FieldsFunc(phrase, func(c rune) bool {
		return unicode.IsSpace(c) || (unicode.IsPunct(c) && c != '\'')
	}) {
		word = strings.ToLower(strings.Trim(word, "'"))
		for _, c := range word {
			if unicode.IsLetter(c) || unicode.IsNumber(c) {
				result[word]++
				break
			}
		}
	}
	return result
}