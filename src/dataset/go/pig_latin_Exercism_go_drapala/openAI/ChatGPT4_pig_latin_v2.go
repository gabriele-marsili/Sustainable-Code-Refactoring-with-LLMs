package piglatin

import (
	"strings"
)

var vowelSounds = []string{"a", "e", "i", "o", "u", "xr", "yt"}
var qu = "qu"

// Checks if a word starts with a vowel sound
func VowelSounds(word string) bool {
	for _, v := range vowelSounds {
		if strings.HasPrefix(word, v) {
			return true
		}
	}
	return false
}

// Finds the index of the first vowel sound in a word
func ConsonantClusterIndex(word string) int {
	for i, ch := range word {
		if strings.ContainsRune("aeiou", ch) || (i > 0 && (strings.HasPrefix(word[i:], "xr") || strings.HasPrefix(word[i:], "yt"))) {
			return i
		}
	}
	return -1
}

// Finds the index after "qu" in a word
func QUIndex(word string) int {
	if idx := strings.Index(word, qu); idx != -1 {
		return idx + len(qu)
	}
	return -1
}

// Converts a single word to Pig Latin
func PigConverter(word string) string {
	if VowelSounds(word) {
		return word + "ay"
	}

	if quIndex := QUIndex(word); quIndex != -1 {
		return word[quIndex:] + word[:quIndex] + "ay"
	}

	if len(word) == 2 && word[1] == 'y' {
		return word[1:] + word[:1] + "ay"
	}

	if clusterIndex := ConsonantClusterIndex(word); clusterIndex != -1 {
		return word[clusterIndex:] + word[:clusterIndex] + "ay"
	}

	return ""
}

// Splits a sentence into words
func SplitStringOnWhitespace(sentence string) []string {
	return strings.Fields(sentence)
}

// Converts a sentence to Pig Latin
func Sentence(sentence string) string {
	words := SplitStringOnWhitespace(sentence)
	for i, word := range words {
		words[i] = PigConverter(word)
	}
	return strings.Join(words, " ")
}