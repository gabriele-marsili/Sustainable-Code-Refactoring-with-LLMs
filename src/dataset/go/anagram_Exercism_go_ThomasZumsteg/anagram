package anagram

import (
	"sort"
	"strings"
)

func sortString(s string) string {
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
	return string(runes)
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