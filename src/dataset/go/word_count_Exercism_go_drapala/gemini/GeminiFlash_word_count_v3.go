package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func CleanWord(in string) string {
	var buf strings.Builder
	buf.Grow(len(in))

	for _, r := range in {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\'' {
			buf.WriteRune(r)
		}
	}

	cleaned := buf.String()

	if len(cleaned) > 1 && cleaned[0] == '\'' && cleaned[len(cleaned)-1] == '\'' {
		return cleaned[1 : len(cleaned)-1]
	}

	return cleaned
}

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	fields := strings.Fields(phrase)

	for _, field := range fields {
		words := strings.Split(field, ",")
		for _, word := range words {
			cleanedWord := CleanWord(word)
			if cleanedWord != "" {
				lowerWord := strings.ToLower(cleanedWord)
				result[lowerWord]++
			}
		}
	}

	return result
}