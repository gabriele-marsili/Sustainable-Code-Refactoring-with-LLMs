package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	phrase = strings.ToLower(phrase)
	start := -1
	for i, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsNumber(r) || r == '\'' {
			if start == -1 {
				start = i
			}
		} else {
			if start != -1 {
				word := phrase[start:i]
				word = strings.Trim(word, "'")
				if len(word) > 0 {
					result[word]++
				}
				start = -1
			}
		}
	}
	if start != -1 {
		word := phrase[start:]
		word = strings.Trim(word, "'")
		if len(word) > 0 {
			result[word]++
		}
	}
	return result
}