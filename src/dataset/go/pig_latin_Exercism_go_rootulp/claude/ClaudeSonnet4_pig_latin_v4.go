package piglatin

import (
	"fmt"
	"strings"
)

var vowelSet = map[byte]bool{
	'a': true, 'e': true, 'i': true, 'o': true, 'u': true,
}

var consonantSounds = []string{"squ", "thr", "sch", "qu", "ch", "th", "rh", "p", "k", "x", "q", "y", "m", "f", "r"}

func Sentence(sentence string) string {
	words := strings.Split(sentence, " ")
	for i, word := range words {
		words[i] = translate(word)
	}
	return strings.Join(words, " ")
}

func translate(word string) string {
	if len(word) == 0 {
		return word
	}
	
	if startsWithVowel(word) ||
		(len(word) >= 2 && (word[:2] == "xr" || word[:2] == "yt")) {
		return handleVowel(word)
	}
	if startsWithConsonantSound(word) {
		return handleConsonantSound(word)
	}
	panic(fmt.Sprintf("unhandled word %v", word))
}

func startsWithVowel(word string) bool {
	if len(word) == 0 {
		return false
	}
	return vowelSet[word[0]]
}

func startsWithConsonantSound(word string) bool {
	for _, cs := range consonantSounds {
		if len(word) >= len(cs) && word[:len(cs)] == cs {
			return true
		}
	}
	return false
}

func handleConsonantSound(word string) string {
	for _, cs := range consonantSounds {
		if len(word) >= len(cs) && word[:len(cs)] == cs {
			return word[len(cs):] + cs + "ay"
		}
	}
	panic(fmt.Sprintf("could not find consonant sound prefix for sentence %v", word))
}

func handleVowel(word string) string {
	return word + "ay"
}