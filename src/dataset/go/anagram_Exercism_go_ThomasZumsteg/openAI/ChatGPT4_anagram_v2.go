package anagram

import (
	"strings"
)

/*Detect finds any anagrams in a list of candidates, case insensitive*/
func Detect(subject string, candidates []string) []string {
	word := strings.ToLower(subject)
	wordSignature := signature(word)
	var anagrams []string

	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		if word != lowerCandidate && signature(lowerCandidate) == wordSignature {
			anagrams = append(anagrams, candidate)
		}
	}

	return anagrams
}

// signature generates a frequency-based signature for a string
func signature(s string) [26]int {
	var freq [26]int
	for _, r := range s {
		if r >= 'a' && r <= 'z' {
			freq[r-'a']++
		}
	}
	return freq
}