package piglatin

import (
	"fmt"
	"strings"
)

var vowels = "aeiou"
var consonantSounds = []string{"squ", "thr", "th", "sch", "qu", "ch", "rh", "p", "k", "x", "q", "y", "m", "f", "r"}

func Sentence(sentence string) string {
	words := strings.Fields(sentence)
	translated := make([]string, len(words))
	for i, word := range words {
		translated[i] = translate(word)
	}
	return strings.Join(translated, " ")
}

func translate(word string) string {
	switch {
	case startsWithVowel(word) || strings.HasPrefix(word, "xr") || strings.HasPrefix(word, "yt"):
		return word + "ay"
	case startsWithConsonantSound(word):
		return handleConsonantSound(word)
	default:
		panic(fmt.Sprintf("unhandled word %v", word))
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
	panic(fmt.Sprintf("could not find consonant sound prefix for word %v", word))
}