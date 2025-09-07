package acronym

import (
	"strings"
	"unicode"
)

func SplitString(s string) []string {
	if s == "" {
		return nil
	}
	
	var result []string
	var current strings.Builder
	
	for _, r := range s {
		if r == '-' || unicode.IsSpace(r) {
			if current.Len() > 0 {
				result = append(result, current.String())
				current.Reset()
			}
		} else {
			current.WriteRune(r)
		}
	}
	
	if current.Len() > 0 {
		result = append(result, current.String())
	}
	
	return result
}

func GetFirstAlphanumeric(s string) string {
	for _, r := range s {
		if r >= 'A' && r <= 'Z' {
			return string(r)
		}
	}
	return ""
}

func Abbreviate(s string) string {
	if s == "" {
		return ""
	}
	
	var result strings.Builder
	var current strings.Builder
	
	for _, r := range s {
		if r == '-' || unicode.IsSpace(r) {
			if current.Len() > 0 {
				word := current.String()
				current.Reset()
				for _, c := range word {
					if c >= 'a' && c <= 'z' {
						c = c - 32
					}
					if c >= 'A' && c <= 'Z' {
						result.WriteByte(byte(c))
						break
					}
				}
			}
		} else {
			current.WriteRune(r)
		}
	}
	
	if current.Len() > 0 {
		word := current.String()
		for _, c := range word {
			if c >= 'a' && c <= 'z' {
				c = c - 32
			}
			if c >= 'A' && c <= 'Z' {
				result.WriteByte(byte(c))
				break
			}
		}
	}
	
	return result.String()
}