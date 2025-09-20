package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func strip(s string) string {
	var result strings.Builder
	result.Grow(len(s)) // Preallocate memory for better performance
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || unicode.IsSpace(r) || r == '\'' {
			result.WriteRune(r)
		}
	}
	return result.String()
}

func CleanWord(in string) string {
	if in == "" {
		return ""
	}
	out := strip(in)
	if len(out) > 1 && out[0] == '\'' && out[len(out)-1] == '\'' {
		out = out[1 : len(out)-1]
	}
	return out
}

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	for _, word := range strings.FieldsFunc(phrase, func(r rune) bool {
		return unicode.IsSpace(r) || r == ','
	}) {
		cleaned := CleanWord(word)
		if cleaned != "" {
			result[strings.ToLower(cleaned)]++
		}
	}
	return result
}