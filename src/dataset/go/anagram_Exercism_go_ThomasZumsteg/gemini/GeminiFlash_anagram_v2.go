package anagram

import (
	"sort"
	"strings"
)

// Detect finds any anagrams in a list of candidates, case insensitive
func Detect(subject string, candidates []string) []string {
	subjectLower := strings.ToLower(subject)
	subjectRunes := []rune(subjectLower)
	sort.Slice(subjectRunes, func(i, j int) bool { return subjectRunes[i] < subjectRunes[j] })
	subjectSorted := string(subjectRunes)

	anagrams := make([]string, 0)
	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)

		// Optimization: Skip if lengths are different
		if len(candidateLower) != len(subjectLower) {
			continue
		}

		// Optimization: Skip if the strings are identical (case-insensitive)
		if candidateLower == subjectLower {
			continue
		}

		candidateRunes := []rune(candidateLower)
		sort.Slice(candidateRunes, func(i, j int) bool { return candidateRunes[i] < candidateRunes[j] })
		candidateSorted := string(candidateRunes)

		if candidateSorted == subjectSorted {
			anagrams = append(anagrams, candidateLower)
		}
	}
	return anagrams
}