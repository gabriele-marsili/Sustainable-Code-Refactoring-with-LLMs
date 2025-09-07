package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) (result Frequency) {
	result = make(Frequency)
	fields := strings.FieldsFunc(phrase, func(r rune) bool {
		return unicode.IsSpace(r) || (unicode.IsPunct(r) && r != '\'')
	})

	for _, field := range fields {
		word := strings.ToLower(field)
		word = strings.Trim(word, "'")

		if len(word) == 0 {
			continue
		}

		valid := false
		for _, r := range word {
			if unicode.IsLetter(r) || unicode.IsNumber(r) {
				valid = true
				break
			}
		}

		if valid {
			result[word]++
		}
	}

	return result
}