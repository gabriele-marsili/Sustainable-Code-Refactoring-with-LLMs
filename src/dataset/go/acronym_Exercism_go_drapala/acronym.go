package acronym

import (
	"strings"
	"unicode"
)

func SplitString(s string) []string {
	if s == "" {
		return nil
	}
	
	capacity := strings.Count(s, "-") + strings.Count(s, " ") + 1
	result := make([]string, 0, capacity)
	
	start := 0
	for i, r := range s {
		if r == '-' || r == ' ' {
			if i > start {
				result = append(result, s[start:i])
			}
			start = i + 1
		}
	}
	if start < len(s) {
		result = append(result, s[start:])
	}
	
	return result
}

func GetFirstAlphanumeric(s string) string {
	for _, r := range s {
		if unicode.IsLetter(r) {
			return string(unicode.ToUpper(r))
		}
	}
	return ""
}

func Abbreviate(s string) string {
	if s == "" {
		return ""
	}
	
	words := SplitString(s)
	if len(words) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(words))
	
	for _, word := range words {
		if word != "" {
			builder.WriteString(GetFirstAlphanumeric(word))
		}
	}
	
	return builder.String()
}