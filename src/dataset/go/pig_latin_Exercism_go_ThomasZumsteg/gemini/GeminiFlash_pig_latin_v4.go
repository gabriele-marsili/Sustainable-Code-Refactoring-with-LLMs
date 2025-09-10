package igpay

import (
	"strings"
)

var (
	vowels = "aeiou"
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
	engl = strings.ToLower(engl)
	if len(engl) == 0 {
		return ""
	}

	firstChar := engl[0]

	if strings.Contains(vowels, string(firstChar)) {
		return engl + "ay"
	}

	if firstChar == 'y' {
		for i := 1; i < len(engl); i++ {
			if strings.Contains(vowels, string(engl[i])) {
				return engl[i:] + engl[:i] + "ay"
			}
		}
		return engl + "ay"
	}

	if strings.HasPrefix(engl, "qu") {
		return engl[2:] + "quay"
	}

	for i := 1; i < len(engl); i++ {
		if strings.Contains(vowels, string(engl[i])) {
			return engl[i:] + engl[:i] + "ay"
		}
	}

	return engl + "ay"
}