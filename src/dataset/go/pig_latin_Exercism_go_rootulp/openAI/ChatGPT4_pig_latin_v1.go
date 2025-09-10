package piglatin

import (
	"strings"
)

var vowels = "aeiou"
var consonantSounds = []string{"squ", "thr", "th", "sch", "qu", "ch", "rh", "p", "k", "x", "q", "y", "m", "f", "r"}

func Sentence(sentence string) string {
	words := strings.Fields(sentence)
	for i, word := range words {
		words[i] = translate(word)
	}
	return strings.Join(words, " ")
}

func translate(word string) string {
	switch {
	case startsWithVowel(word) || strings.HasPrefix(word, "xr") || strings.HasPrefix(word, "yt"):
		return word + "ay"
	case startsWithConsonantSound(word):
		return handleConsonantSound(word)
	default:
		panic("unhandled word " + word)
	}
}

func startsWithVowel(word string) bool {
	return strings.ContainsRune(vowels, rune(word[0]))
}

func startsWithConsonantSound(word string) bool {
	for _, cs := range consonantSounds {
		if strings.HasPrefix(word, cs) {
			return true
		}
	}
	return false
}

func handleConsonantSound(word string) string {
	for _, cs := range consonantSounds {
		if strings.HasPrefix(word, cs) {
			return word[len(cs):] + cs + "ay"
		}
	}
	panic("could not find consonant sound prefix for word " + word)
}