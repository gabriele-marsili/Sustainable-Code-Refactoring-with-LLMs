package piglatin

import (
	"strings"
)

func VowelSounds(word string) bool {
	word = strings.ToLower(word)
	return len(word) > 0 && (strings.HasPrefix(word, "a") ||
		strings.HasPrefix(word, "e") ||
		strings.HasPrefix(word, "i") ||
		strings.HasPrefix(word, "o") ||
		strings.HasPrefix(word, "u") ||
		strings.HasPrefix(word, "xr") ||
		strings.HasPrefix(word, "yt"))
}

func ConsonantClusterIndex(word string) int {
	word = strings.ToLower(word)
	for i := 0; i < len(word); i++ {
		switch word[i] {
		case 'a', 'e', 'i', 'o', 'u':
			return i
		}
	}
	return -1
}

func QUIndex(word string) int {
	word = strings.ToLower(word)
	if strings.HasPrefix(word, "qu") {
		return 2
	}
	return -1
}

// Operates per word
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