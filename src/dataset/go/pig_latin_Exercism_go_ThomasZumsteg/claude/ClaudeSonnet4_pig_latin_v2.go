package igpay

import (
	"strings"
)

/*PigLatin converts a sentance to pig latin.*/
func PigLatin(engl string) string {
	words := strings.Fields(engl)
	pigWords := make([]string, 0, len(words))
	for _, word := range words {
		pigWords = append(pigWords, pigLatinWord(word))
	}
	return strings.Join(pigWords, " ")
}

/*pigLatinWord converts a single word to piglating.*/
func pigLatinWord(engl string) string {
	if len(engl) == 0 {
		return engl
	}
	
	// Leading y
	if engl[0] == 'y' && len(engl) > 1 && !isVowel(engl[1]) {
		return engl[1:] + "yay"
	}
	
	// Find first vowel position
	for i, r := range engl {
		if isVowel(byte(r)) {
			// Handle 'qu' case
			if i > 0 && engl[i-1] == 'q' && r == 'u' {
				continue
			}
			if i == 0 {
				return engl + "ay"
			}
			return engl[i:] + engl[:i] + "ay"
		}
	}
	
	return engl + "ay"
}

func isVowel(b byte) bool {
	return b == 'a' || b == 'e' || b == 'i' || b == 'o' || b == 'u'
}