package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	fields := strings.FieldsFunc(phrase, func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r) && r != ',' && r != '\''
	})

	for _, field := range fields {
		words := strings.Split(field, ",")
		for _, word := range words {
			word = strings.Trim(word, "'")
			word = strings.ToLower(word)
			if word != "" {
				result[word]++
			}
		}
	}

	return result
}