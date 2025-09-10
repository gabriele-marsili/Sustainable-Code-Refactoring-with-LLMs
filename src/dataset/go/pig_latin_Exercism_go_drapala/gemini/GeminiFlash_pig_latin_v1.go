package piglatin

import (
	"strings"
)

var vowels = []string{"a", "e", "i", "o", "u"}
var vowelPrefixes = []string{"xr", "yt"}

func VowelSounds(word string) bool {
	word = strings.ToLower(word)
	for _, v := range vowels {
		if strings.HasPrefix(word, v) {
			return true
		}
	}
	for _, prefix := range vowelPrefixes {
		if strings.HasPrefix(word, prefix) {
			return true
		}
	}
	return false
}

func ConsonantClusterIndex(word string) int {
	word = strings.ToLower(word)
	for i := 0; i < len(word); i++ {
		isVowel := false
		for _, v := range vowels {
			if string(word[i]) == v {
				isVowel = true
				break
			}
		}
		if isVowel {
			return i
		}
	}
	return -1
}

func QUIndex(word string) int {
	word = strings.ToLower(word)
	if len(word) >= 2 && word[:2] == "qu" {
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
		return word[1:] + word[:1] + "ay"
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