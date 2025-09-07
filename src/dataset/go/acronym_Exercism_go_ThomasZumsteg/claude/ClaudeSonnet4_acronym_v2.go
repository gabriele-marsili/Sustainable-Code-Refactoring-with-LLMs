package acronym

import "strings"

func Abbreviate(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(s) / 4) // Pre-allocate reasonable capacity
	
	takeNext := true
	for _, char := range s {
		if char == ' ' || char == '-' {
			takeNext = true
		} else if takeNext {
			if char >= 'a' && char <= 'z' {
				result.WriteByte(byte(char - 32)) // Convert to uppercase
			} else if char >= 'A' && char <= 'Z' {
				result.WriteByte(byte(char))
			}
			takeNext = false
		}
	}
	
	return result.String()
}

func SplitAny(s string, seps []string) []string {
	if len(s) == 0 {
		return nil
	}
	
	result := make([]string, 0, 8) // Pre-allocate reasonable capacity
	var word strings.Builder
	word.Grow(16) // Pre-allocate for typical word length
	
	sepMap := make(map[rune]bool, len(seps))
	for _, sep := range seps {
		if len(sep) == 1 {
			sepMap[rune(sep[0])] = true
		}
	}
	
	for _, char := range s {
		if sepMap[char] {
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