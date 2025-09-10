package piglatin

import (
	"regexp"
	"strings"
)

var (
	vowelRegex = regexp.MustCompile(`(?i)^(a|e|i|o|u|xr|yt)`)
	quRegex    = regexp.MustCompile(`(?i)qu`)
)

func VowelSounds(sentence string) bool {
	return vowelRegex.MatchString(sentence)
}

func ConsonantClusterIndex(sentence string) int {
	loc := vowelRegex.FindStringIndex(sentence)
	if loc == nil {
		return -1
	}
	return loc[0]
}

func QUIndex(sentence string) int {
	loc := quRegex.FindStringIndex(sentence)
	if loc == nil {
		return -1
	}
	return loc[1]
}

func PigConverter(word string) string {
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
	return strings.Fields(sentence)
}

func Sentence(sentence string) string {
	words := SplitStringOnWhitespace(sentence)
	result := make([]string, len(words))
	for i, word := range words {
		result[i] = PigConverter(word)
	}
	return strings.Join(result, " ")
}