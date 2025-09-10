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

	firstChar := englLower[0]

	if firstChar == 'y' && len(englLower) > 1 && !strings.Contains("aeiou", string(englLower[1])) {
		return englLower[1:] + englLower[:1] + "ay"
	}

	if i := strings.Index(englLower, "u"); i > 0 && englLower[i-1] != 'q' {
		return englLower[i:] + englLower[:i] + "ay"
	}

	if strings.Contains("aeoi", string(firstChar)) {
		return englLower + "ay"
	}

	for i := 0; i < len(englLower); i++ {
		if strings.Contains("aeoi", string(englLower[i])) {
			return englLower[i:] + englLower[:i] + "ay"
		}
	}

	return englLower + "ay"
}