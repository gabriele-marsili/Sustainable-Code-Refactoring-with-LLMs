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

	s := buf.String()

	if len(s) > 1 && s[0] == '\'' && s[len(s)-1] == '\'' {
		return s[1 : len(s)-1]
	}

	return s
}

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	fields := strings.FieldsFunc(phrase, func(r rune) bool {
		return r == ',' || unicode.IsSpace(r)
	})

	for _, field := range fields {
		cleaned := CleanWord(field)
		if cleaned != "" {
			result[strings.ToLower(cleaned)]++
		}
	}

	return result
}