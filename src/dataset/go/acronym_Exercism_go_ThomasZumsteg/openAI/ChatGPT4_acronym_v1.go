package acronym

import (
	"strings"
	"unicode"
)

func Abbreviate(s string) string {
	var acronym strings.Builder
	for _, word := range SplitAny(s, []rune{' ', '-'}) {
		acronym.WriteByte(byte(unicode.ToUpper(rune(word[0]))))
	}
	return acronym.String()
}

func SplitAny(s string, seps []rune) []string {
	var result []string
	var word strings.Builder
	sepSet := make(map[rune]struct{}, len(seps))
	for _, sep := range seps {
		sepSet[sep] = struct{}{}
	}

	for _, char := range s {
		if _, isSep := sepSet[char]; isSep {
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