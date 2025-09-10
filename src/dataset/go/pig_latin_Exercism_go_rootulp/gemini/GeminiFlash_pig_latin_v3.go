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
	switch {
	case startsWithVowel(word) || strings.HasPrefix(word, "xr") || strings.HasPrefix(word, "yt"):
		return handleVowel(word)
	case startsWithConsonantSound(word):
		return handleConsonantSound(word)
	default:
		return "" // Or handle the error in a more graceful way, like returning an error value
	}
}

func startsWithVowel(sentence string) bool {
	for _, vowel := range vowels {
		if strings.HasPrefix(sentence, vowel) {
			return true
		}
	}
	return false
}

func startsWithConsonantSound(sentence string) bool {
	for _, cs := range consonantSounds {
		if strings.HasPrefix(sentence, cs) {
			return true
		}
	}
	return false
}

func handleConsonantSound(sentence string) string {
	for _, cs := range consonantSounds {
		if strings.HasPrefix(sentence, cs) {
			return sentence[len(cs):] + cs + "ay"
		}
	}
	return "" // Or handle the error in a more graceful way, like returning an error value
}

func handleVowel(sentence string) string {
	return sentence + "ay"
}