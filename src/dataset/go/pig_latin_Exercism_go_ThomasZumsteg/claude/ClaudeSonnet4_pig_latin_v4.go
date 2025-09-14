package igpay

import (
	"strings"
	"unicode"
)

var vowels = map[rune]bool{
	'a': true, 'e': true, 'i': true, 'o': true, 'u': true,
	'A': true, 'E': true, 'I': true, 'O': true, 'U': true,
}

func PigLatin(engl string) string {
	if len(engl) == 0 {
		return engl
	}
	
	words := strings.Fields(engl)
	if len(words) == 0 {
		return engl
	}
	
	result := make([]string, len(words))
	for i, word := range words {
		result[i] = pigLatinWord(word)
	}
	return strings.Join(result, " ")
}

func pigLatinWord(word string) string {
	if len(word) == 0 {
		return word
	}
	
	runes := []rune(word)
	length := len(runes)
	
	if length == 1 {
		return word + "ay"
	}
	
	if runes[0] == 'y' || runes[0] == 'Y' {
		if length > 1 && !vowels[runes[1]] {
			return string(runes[1:]) + string(runes[0]) + "ay"
		}
	}
	
	for i := 0; i < length-1; i++ {
		if vowels[runes[i]] {
			if i == 0 {
				return word + "ay"
			}
			if i > 0 && runes[i-1] == 'q' && (runes[i] == 'u' || runes[i] == 'U') {
				continue
			}
			consonantCluster := string(runes[:i])
			remainder := string(runes[i:])
			return remainder + consonantCluster + "ay"
		}
	}
	
	return word + "ay"
}