package piglatin

import (
	"strings"
)

var vowels = "aeiou"
var consonantSounds = []string{"squ", "thr", "sch", "qu", "th", "ch", "rh"}

func Sentence(sentence string) string {
	words := strings.Fields(sentence)
	for i, word := range words {
		words[i] = translate(word)
	}
	return strings.Join(words, " ")
}

func translate(word string) string {
	if startsWithVowel(word) || strings.HasPrefix(word, "xr") || strings.HasPrefix(word, "yt") {
		return word + "ay"
	}
	for _, cs := range consonantSounds {
		if strings.HasPrefix(word, cs) {
			return word[len(cs):] + cs + "ay"
		}
	}
	return word[1:] + string(word[0]) + "ay"
}

func startsWithVowel(word string) bool {
	return strings.ContainsRune(vowels, rune(word[0]))
}