package igpay

import (
	"strings"
	"unicode"
)

/*PigLatin converts a sentence to pig latin.*/
func PigLatin(engl string) string {
	words := strings.Fields(engl)
	for i, word := range words {
		words[i] = pigLatinWord(word)
	}
	return strings.Join(words, " ")
}

/*pigLatinWord converts a single word to pig latin.*/
func pigLatinWord(engl string) string {
	vowels := "aeiou"
	if len(engl) == 0 {
		return engl
	}

	// Handle leading 'y' as a special case
	if engl[0] == 'y' && !strings.ContainsRune(vowels, rune(engl[1])) {
		return engl[1:] + "y" + "ay"
	}

	for i, r := range engl {
		if strings.ContainsRune(vowels, r) || (r == 'u' && i > 0 && engl[i-1] == 'q') {
			if i == 0 {
				return engl + "ay"
			}
			return engl[i:] + engl[:i] + "ay"
		}
	}

	return engl + "ay"
}