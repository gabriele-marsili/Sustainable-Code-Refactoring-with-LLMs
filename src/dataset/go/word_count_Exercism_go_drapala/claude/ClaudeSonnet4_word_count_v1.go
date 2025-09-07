package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func isValidChar(r rune) bool {
	return unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\'' || r == ' '
}

func CleanWord(in string) string {
	if in == "" {
		return ""
	}

	// Build cleaned string in single pass
	runes := []rune(in)
	cleaned := make([]rune, 0, len(runes))
	
	for _, r := range runes {
		if isValidChar(r) {
			cleaned = append(cleaned, r)
		}
	}
	
	if len(cleaned) == 0 {
		return ""
	}
	
	// Remove surrounding quotes
	if len(cleaned) >= 2 && cleaned[0] == '\'' && cleaned[len(cleaned)-1] == '\'' {
		cleaned = cleaned[1 : len(cleaned)-1]
	}
	
	return string(cleaned)
}

func WordCount(phrase string) Frequency {
	if phrase == "" {
		return make(Frequency)
	}
	
	result := make(Frequency)
	
	// Process phrase character by character to extract words
	runes := []rune(strings.ToLower(phrase))
	word := make([]rune, 0, 32) // Pre-allocate with reasonable capacity
	
	for i, r := range runes {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\'' {
			word = append(word, r)
		} else if len(word) > 0 {
			// End of word, process it
			cleanedWord := CleanWord(string(word))
			if cleanedWord != "" {
				result[cleanedWord]++
			}
			word = word[:0] // Reset slice but keep capacity
		}
		
		// Handle last word if phrase doesn't end with delimiter
		if i == len(runes)-1 && len(word) > 0 {
			cleanedWord := CleanWord(string(word))
			if cleanedWord != "" {
				result[cleanedWord]++
			}
		}
	}
	
	return result
}