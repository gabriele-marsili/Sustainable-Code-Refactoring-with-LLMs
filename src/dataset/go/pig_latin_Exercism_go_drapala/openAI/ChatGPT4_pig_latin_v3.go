package piglatin

import (
	"strings"
)

var vowelRegex = "a|e|i|o|u|xr|yt"
var quRegex = "qu"

func VowelSounds(sentence string) bool {
	return strings.HasPrefix(sentence, "a") || strings.HasPrefix(sentence, "e") ||
		strings.HasPrefix(sentence, "i") || strings.HasPrefix(sentence, "o") ||
		strings.HasPrefix(sentence, "u") || strings.HasPrefix(sentence, "xr") ||
		strings.HasPrefix(sentence, "yt")
}

func ConsonantClusterIndex(sentence string) int {
	for i, char := range sentence {
		if strings.ContainsRune("aeiou", char) || (i == 0 && (strings.HasPrefix(sentence[i:], "xr") || strings.HasPrefix(sentence[i:], "yt"))) {
			return i
		}
	}
	return -1
}

func QUIndex(sentence string) int {
	if idx := strings.Index(sentence, "qu"); idx != -1 {
		return idx + 2
	}
	return -1
}

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

func SplitStringOnWhitespace(sentence string) []string {
	return strings.Fields(sentence)
}

func Sentence(sentence string) string {
	words := SplitStringOnWhitespace(sentence)
	for i, word := range words {
		words[i] = PigConverter(word)
	}
	return strings.Join(words, " ")
}