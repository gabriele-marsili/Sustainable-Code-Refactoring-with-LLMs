package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	wordBuilder := strings.Builder{}
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsNumber(r) || r == '\'' {
			wordBuilder.WriteRune(r)
		} else if wordBuilder.Len() > 0 {
			word := normalizeWord(wordBuilder.String())
			if word != "" {
				result[word]++
			}
			wordBuilder.Reset()
		}
	}
	if wordBuilder.Len() > 0 {
		word := normalizeWord(wordBuilder.String())
		if word != "" {
			result[word]++
		}
	}
	return result
}

func normalizeWord(word string) string {
	word = strings.ToLower(strings.Trim(word, "'"))
	for _, r := range word {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			return word
		}
	}
	return ""
}