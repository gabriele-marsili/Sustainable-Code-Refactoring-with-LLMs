package anagram

import (
	"sort"
	"strings"
)

func Detect(subject string, candidates []string) []string {
	word := strings.ToLower(subject)
	wordSorted := sortString(word)
	
	anagrams := make([]string, 0, len(candidates))
	
	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		if len(word) == len(lowerCandidate) && word != lowerCandidate {
			if sortString(lowerCandidate) == wordSorted {
				anagrams = append(anagrams, candidate)
			}
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