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
	wordLower := strings.ToLower(word)

	if startsWithVowel(wordLower) ||
		strings.HasPrefix(wordLower, "xr") ||
		strings.HasPrefix(wordLower, "yt") {
		return word + "ay"
	}
	if consonantPrefix := findConsonantSoundPrefix(wordLower); consonantPrefix != "" {
		return word[len(consonantPrefix):] + consonantPrefix + "ay"
	}

	return word + "ay" // Consider this the default case, avoids panic
}

func startsWithVowel(word string) bool {
	firstChar := ""
	if len(word) > 0 {
		firstChar = word[:1]
	}

	for _, vowel := range vowels {
		if firstChar == vowel {
			return true
		}
	}
	return false
}

func findConsonantSoundPrefix(word string) string {
	for _, cs := range consonantSounds {
		if strings.HasPrefix(word, cs) {
			return cs
		}
	}
	return ""
}