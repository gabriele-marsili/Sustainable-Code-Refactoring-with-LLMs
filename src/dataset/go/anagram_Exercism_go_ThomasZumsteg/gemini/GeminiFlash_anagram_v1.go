package anagram

import (
	"sort"
	"strings"
)

func normalize(s string) string {
	s = strings.ToLower(s)
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	return string(runes)
}

/*Detect finds any anagrams in a list of candidates, case insensitive*/
func Detect(subject string, candidates []string) []string {
	subjectNormalized := normalize(subject)
	var anagrams []string
	subjectLower := strings.ToLower(subject)

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)

		if subjectLower == candidateLower {
			continue
		}

		if normalize(candidate) == subjectNormalized {
			anagrams = append(anagrams, candidateLower)
		}
	}
	return anagrams
}