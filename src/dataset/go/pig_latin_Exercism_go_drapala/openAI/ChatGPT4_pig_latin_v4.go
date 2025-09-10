package piglatin

import (
	"strings"
)

var (
	vowelRegex       = "a|e|i|o|u|xr|yt"
	vowelPattern     = compileRegex(vowelRegex)
	quPattern        = compileRegex("qu")
	whitespacePattern = compileRegex("\\s+")
)

func compileRegex(pattern string) *strings.Replacer {
	return regexp.MustCompile(pattern)
}

func VowelSounds(sentence string) bool {
	return vowelPattern.MatchString(sentence) && vowelPattern.FindStringIndex(sentence)[0] == 0
}

func ConsonantClusterIndex(sentence string) int {
	if matches := vowelPattern.FindStringIndex(sentence); len(matches) > 0 {
		return matches[0]
	}
	return -1
}

func QUIndex(sentence string) int {
	if matches := quPattern.FindStringIndex(sentence); len(matches) > 0 {
		return matches[1]
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
	return whitespacePattern.Split(sentence, -1)
}

func Sentence(sentence string) string {
	words := SplitStringOnWhitespace(sentence)
	for i, word := range words {
		words[i] = PigConverter(word)
	}
	return strings.Join(words, " ")
}