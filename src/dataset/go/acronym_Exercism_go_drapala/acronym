package acronym

import (
	"strings"
	"unicode"
)

func SplitString(s string) []string {
	return strings.FieldsFunc(s, func(r rune) bool {
		return r == '-' || unicode.IsSpace(r)
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
	var sb strings.Builder
	for _, word := range SplitString(strings.ToUpper(s)) {
		if first := GetFirstAlphanumeric(word); first != "" {
			sb.WriteString(first)
		}
	}
	return sb.String()
}