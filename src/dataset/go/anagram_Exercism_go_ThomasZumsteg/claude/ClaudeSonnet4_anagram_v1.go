package anagram

import (
	"sort"
	"strings"
)

func Detect(subject string, candidates []string) []string {
	word := strings.ToLower(subject)
	wordSorted := sortString(word)
	
	var anagrams []string
	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		if word != lowerCandidate && sortString(lowerCandidate) == wordSorted {
			anagrams = append(anagrams, lowerCandidate)
		}
	}
	return anagrams
}

func sortString(s string) string {
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	return string(runes)
}