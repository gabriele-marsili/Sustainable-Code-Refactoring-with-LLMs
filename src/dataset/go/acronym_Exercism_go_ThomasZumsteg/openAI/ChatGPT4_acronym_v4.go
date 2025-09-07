package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var acronym strings.Builder
	acronym.Grow(len(s))
	for _, word := range SplitAny(s, " -") {
		acronym.WriteByte(byte(unicode.ToUpper(rune(word[0]))))
	}
	return acronym.String()
}

func SplitAny(s, seps string) []string {
	var result []string
	var word strings.Builder
	for _, char := range s {
		if strings.ContainsRune(seps, char) {
			if word.Len() > 0 {
				result = append(result, word.String())
				word.Reset()
			}
		} else {
			word.WriteRune(char)
		}
	}
	if word.Len() > 0 {
		result = append(result, word.String())
	}
	return result
}