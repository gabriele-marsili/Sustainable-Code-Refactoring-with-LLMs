package piglatin

import (
	"strings"
)

func VowelSounds(sentence string) bool {
	if len(sentence) == 0 {
		return false
	}
	
	// Check for vowel sounds at the beginning
	if sentence[0] == 'a' || sentence[0] == 'e' || sentence[0] == 'i' || sentence[0] == 'o' || sentence[0] == 'u' {
		return true
	}
	
	// Check for "xr" and "yt" at the beginning
	if len(sentence) >= 2 {
		prefix := sentence[:2]
		return prefix == "xr" || prefix == "yt"
	}
	
	return false
}

func ConsonantClusterIndex(sentence string) int {
	for i, char := range sentence {
		if char == 'a' || char == 'e' || char == 'i' || char == 'o' || char == 'u' {
			return i
		}
		// Check for "xr" and "yt"
		if i < len(sentence)-1 {
			if (char == 'x' && sentence[i+1] == 'r') || (char == 'y' && sentence[i+1] == 't') {
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
	
	// Check if starts with vowel sound
	if VowelSounds(word) {
		return word + "ay"
	}
	
	// Check for "qu"
	qu_index := QUIndex(word)
	if qu_index != -1 {
		return word[qu_index:] + word[0:qu_index] + "ay"
	}
	
	// Check for "y" as second letter in 2-letter word
	if len(word) == 2 && word[1] == 'y' {
		return word[1:] + word[0:1] + "ay"
	}
	
	// Find consonant cluster
	cluster_index := ConsonantClusterIndex(word)
	if cluster_index != -1 {
		return word[cluster_index:] + word[:cluster_index] + "ay"
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
	
	result := make([]string, len(words))
	for i, word := range words {
		result[i] = PigConverter(word)
	}
	
	return strings.Join(result, " ")
}