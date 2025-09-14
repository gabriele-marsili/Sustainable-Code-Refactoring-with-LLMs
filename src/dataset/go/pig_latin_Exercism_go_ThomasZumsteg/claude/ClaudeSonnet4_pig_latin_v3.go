package igpay

import (
	"strings"
	"unicode"
)

/*PigLatin converts a sentance to pig latin.*/
func PigLatin(engl string) string {
	if engl == "" {
		return ""
	}
	
	words := strings.Fields(engl)
	if len(words) == 0 {
		return ""
	}
	
	result := make([]string, 0, len(words))
	for _, word := range words {
		result = append(result, pigLatinWord(word))
	}
	return strings.Join(result, " ")
}

/*pigLatinWord converts a single word to piglating.*/
func pigLatinWord(engl string) string {
	if len(engl) == 0 {
		return engl
	}
	
	runes := []rune(engl)
	length := len(runes)
	
	if length == 1 {
		return engl + "ay"
	}
	
	// Leading y followed by consonant
	if runes[0] == 'y' && length > 1 && !isVowel(runes[1]) {
		return string(runes[1:]) + "yay"
	}
	
	// Find first vowel position
	vowelPos := -1
	for i, r := range runes {
		if isVowel(r) {
			// Handle 'qu' case
			if i > 0 && runes[i-1] == 'q' && r == 'u' {
				continue
			}
			vowelPos = i
			break
		}
	}
	
	if vowelPos == -1 {
		return engl + "ay"
	}
	
	if vowelPos == 0 {
		return engl + "ay"
	}
	
	return string(runes[vowelPos:]) + string(runes[:vowelPos]) + "ay"
}

func isVowel(r rune) bool {
	lower := unicode.ToLower(r)
	return lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u'
}