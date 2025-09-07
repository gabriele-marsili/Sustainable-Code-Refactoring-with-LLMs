package acronym

import (
	"strings"
	"unicode"
)

func SplitString(s string) []string {
	return strings.FieldsFunc(s, func(c rune) bool {
		return c == '-' || unicode.IsSpace(c)
	})
}

func GetFirstAlphanumeric(s string) string {
	for _, c := range s {
		if c >= 'A' && c <= 'Z' {
			return string(c)
		}
	}
	return ""
}

func Abbreviate(s string) string {
	words := SplitString(s)
	if len(words) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(words))
	
	upperS := strings.ToUpper(s)
	wordStart := 0
	
	for _, word := range words {
		if len(word) > 0 {
			wordIndex := strings.Index(upperS[wordStart:], strings.ToUpper(word))
			if wordIndex >= 0 {
				wordStart += wordIndex
				for i, c := range upperS[wordStart:] {
					if c >= 'A' && c <= 'Z' {
						result.WriteByte(byte(c))
						wordStart += i + 1
						break
					}
				}
			}
		}
	}
	
	return result.String()
}