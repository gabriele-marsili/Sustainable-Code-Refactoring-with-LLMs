package igpay

import (
	"strings"
	"unicode"
)

/*PigLatin converts a sentence to pig latin.*/
func PigLatin(engl string) string {
	words := strings.Fields(engl)
	pigWords := make([]string, len(words))
	for i, word := range words {
		pigWords[i] = pigLatinWord(word)
	}
	return strings.Join(pigWords, " ")
}

/*pigLatinWord converts a single word to pig latin.*/
func pigLatinWord(engl string) string {
	vowels := "aeiou"
	for i, r := range engl {
		if strings.ContainsRune(vowels, r) || (r == 'y' && i > 0) {
			return engl[i:] + engl[:i] + "ay"
		}
	}
	return engl + "ay"
}