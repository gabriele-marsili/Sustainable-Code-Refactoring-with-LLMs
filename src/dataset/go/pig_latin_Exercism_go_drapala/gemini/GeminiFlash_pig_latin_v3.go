package piglatin

import (
	"strings"
)

var (
	vowelPrefixes = []string{"a", "e", "i", "o", "u", "xr", "yt"}
)

func VowelSounds(sentence string) bool {
	sentence = strings.ToLower(sentence)
	for _, prefix := range vowelPrefixes {
		if strings.HasPrefix(sentence, prefix) {
			return true
		}
	}
	return false
}

func ConsonantClusterIndex(sentence string) int {
	sentence = strings.ToLower(sentence)
	for i := 0; i < len(sentence); i++ {
		if strings.Contains("aeiou", string(sentence[i])) {
			return i
		}
	}
	return -1
}

func QUIndex(sentence string) int {
	sentence = strings.ToLower(sentence)
	if strings.HasPrefix(sentence, "qu") {
		return 2
	}
	return -1
}

func PigConverter(word string) string {
	word = strings.ToLower(word)
	if VowelSounds(word) {
		return word + "ay"
	}

	quIndex := QUIndex(word)
	if quIndex != -1 {
		return word[quIndex:] + word[:quIndex] + "ay"
	}

	if len(word) == 2 && word[1] == 'y' {
		return word[1:] + word[0:1] + "ay"
	}

	clusterIndex := ConsonantClusterIndex(word)
	if clusterIndex != -1 {
		return word[clusterIndex:] + word[:clusterIndex] + "ay"
	}

	return ""
}

func SplitStringOnWhitespace(sentence string) []string {
	return strings.Split(sentence, " ")
}

func Sentence(sentence string) string {
	words := SplitStringOnWhitespace(sentence)
	result := make([]string, len(words))
	for i, word := range words {
		result[i] = PigConverter(word)
	}
	return strings.Join(result, " ")
}