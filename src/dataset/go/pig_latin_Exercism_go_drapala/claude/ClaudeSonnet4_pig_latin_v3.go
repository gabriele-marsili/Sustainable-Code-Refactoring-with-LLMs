package piglatin

import (
	"strings"
)

var vowelSounds = map[byte]bool{
	'a': true, 'e': true, 'i': true, 'o': true, 'u': true,
}

func VowelSounds(sentence string) bool {
	if len(sentence) == 0 {
		return false
	}
	
	if vowelSounds[sentence[0]] {
		return true
	}
	
	if len(sentence) >= 2 {
		prefix := sentence[:2]
		return prefix == "xr" || prefix == "yt"
	}
	
	return false
}

func ConsonantClusterIndex(sentence string) int {
	for i := 0; i < len(sentence); i++ {
		if vowelSounds[sentence[i]] {
			return i
		}
		
		if i < len(sentence)-1 {
			prefix := sentence[i:i+2]
			if prefix == "xr" || prefix == "yt" {
				return i
			}
		}
	}
	return -1
}

func QUIndex(sentence string) int {
	for i := 0; i < len(sentence)-1; i++ {
		if sentence[i] == 'q' && sentence[i+1] == 'u' {
			return i + 2
		}
	}
	return -1
}

func PigConverter(word string) string {
	if len(word) == 0 {
		return ""
	}
	
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
	if len(words) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(sentence) + len(words)*2)
	
	for i, word := range words {
		if i > 0 {
			builder.WriteByte(' ')
		}
		builder.WriteString(PigConverter(word))
	}
	
	return builder.String()
}