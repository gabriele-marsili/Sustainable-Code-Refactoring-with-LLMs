package acronym

import "strings"

func Abbreviate(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(s) / 4) // reasonable estimate for acronym length
	
	inWord := false
	for _, char := range s {
		if char == ' ' || char == '-' {
			inWord = false
		} else if !inWord {
			result.WriteRune(toUpper(char))
			inWord = true
		}
	}
	
	return result.String()
}

func SplitAny(s string, seps []string) []string {
	if len(s) == 0 {
		return nil
	}
	
	sepMap := make(map[rune]bool, len(seps))
	for _, sep := range seps {
		if len(sep) > 0 {
			sepMap[rune(sep[0])] = true
		}
	}
	
	result := make([]string, 0, strings.Count(s, " ")+strings.Count(s, "-")+1)
	var word strings.Builder
	
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

func toUpper(r rune) rune {
	if r >= 'a' && r <= 'z' {
		return r - 32
	}
	return r
}