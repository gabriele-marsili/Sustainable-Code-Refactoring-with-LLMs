package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	phrase = strings.ToLower(phrase)
	words := strings.FieldsFunc(phrase, func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r) && r != '\''
	})

	for _, word := range words {
		word = strings.Trim(word, "'")
		if word != "" {
			result[word]++
		}
	}

	return result
}