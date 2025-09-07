package anagram

import (
	"strings"
)

func sortString(s string) string {
	r := []rune(s)
	for i := 0; i < len(r)-1; i++ {
		for j := i + 1; j < len(r); j++ {
			if r[i] > r[j] {
				r[i], r[j] = r[j], r[i]
			}
		}
	}
	return string(r)
}

/*Detect finds any anagrams in a list of candidates, case insensitive*/
func Detect(subject string, candidates []string) []string {
	word := strings.ToLower(subject)
	sortedWord := sortString(word)
	var anagrams []string
	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		if word != lowerCandidate && sortedWord == sortString(lowerCandidate) {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}