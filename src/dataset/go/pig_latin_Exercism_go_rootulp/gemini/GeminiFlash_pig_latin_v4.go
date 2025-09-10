package piglatin

import (
	"strings"
)

var vowels = []string{"a", "e", "i", "o", "u"}
var consonantSounds = []string{"squ", "thr", "th", "sch", "qu", "ch", "rh", "p", "k", "x", "q", "y", "m", "f", "r"}

func Sentence(sentence string) string {
	words := strings.Split(sentence, " ")
	translated := make([]string, len(words))
	for i, word := range words {
		translated[i] = translate(word)
	}
	return strings.Join(translated, " ")
}

func translate(word string) string {
	if startsWithVowel(word) ||
		strings.HasPrefix(word, "xr") ||
		strings.HasPrefix(word, "yt") {
		return word + "ay"
	}
	for _, cs := range consonantSounds {
		if strings.HasPrefix(word, cs) {
			return word[len(cs):] + cs + "ay"
		}
	}
	return word + "ay" // Handle cases where no consonant sound is found (treat as vowel)
}

func startsWithVowel(word string) bool {
	if len(word) == 0 {
		return false
	}
	firstChar := word[0]
	for _, vowel := range vowels {
		if firstChar == vowel[0] && len(vowel) == 1 {
			return true
		}
	}
	return false
}