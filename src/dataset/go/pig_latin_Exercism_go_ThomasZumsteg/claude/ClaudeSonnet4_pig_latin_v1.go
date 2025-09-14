package igpay

import (
	"strings"
)

var (
	vowels = map[byte]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
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
	
	var result strings.Builder
	result.Grow(len(engl) + len(words)*2) // Pre-allocate approximate capacity
	
	for i, word := range words {
		if i > 0 {
			result.WriteByte(' ')
		}
		result.WriteString(pigLatinWord(word))
	}
	
	return result.String()
}

/*pigLatinWord converts a single word to piglating.*/
func pigLatinWord(engl string) string {
	if len(engl) == 0 {
		return engl
	}
	
	// Convert to lowercase for processing
	word := strings.ToLower(engl)
	
	// Leading y followed by consonant
	if len(word) > 1 && word[0] == 'y' && !vowels[word[1]] {
		return word[1:] + "yay"
	}
	
	// Find first vowel or vowel sound
	for i := 0; i < len(word); i++ {
		char := word[i]
		
		// Handle 'u' after 'q'
		if char == 'u' && i > 0 && word[i-1] == 'q' {
			continue
		}
		
		// Check for vowels
		if vowels[char] {
			if i == 0 {
				return word + "ay"
			}
			return word[i:] + word[:i] + "ay"
		}
	}
	
	// No vowels found
	return word + "ay"
}