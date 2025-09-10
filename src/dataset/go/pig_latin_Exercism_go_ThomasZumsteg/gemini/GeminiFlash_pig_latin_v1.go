package igpay

import (
	"strings"
)

/*PigLatin converts a sentance to pig latin.*/
func PigLatin(engl string) string {
	words := strings.Split(engl, " ")
	pigWords := make([]string, len(words))
	for i, word := range words {
		pigWords[i] = pigLatinWord(word)
	}
	return strings.Join(pigWords, " ")
}

/*pigLatinWord converts a single word to piglating.*/
func pigLatinWord(engl string) string {
	englLower := strings.ToLower(engl)
	if len(englLower) == 0 {
		return ""
	}

	firstLetter := englLower[0]

	if strings.HasPrefix(englLower, "y") && !isVowel(englLower[1]) {
		return englLower[1:] + englLower[:1] + "ay"
	}

	if idx := strings.Index(englLower, "u"); idx > 0 && englLower[idx-1] != 'q' {
		return englLower[idx:] + englLower[:idx] + "ay"
	}

	if isVowel(firstLetter) {
		return englLower + "ay"
	}

	for i := 0; i < len(englLower); i++ {
		if isVowel(englLower[i]) {
			return englLower[i:] + englLower[:i] + "ay"
		}
	}

	return englLower + "ay"
}

func isVowel(r byte) bool {
	return r == 'a' || r == 'e' || r == 'i' || r == 'o' || r == 'u'
}