package anagram

import (
	"sort"
	"strings"
)

/*Detect finds any anagrams in a list of candidates, case insensitive*/
func Detect(subject string, candidates []string) []string {
	subjectLower := strings.ToLower(subject)
	subjectSorted := sortString(subjectLower)

	anagrams := make([]string, 0)
	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		if subjectLower == candidateLower {
			continue
		}

		if len(subjectLower) != len(candidateLower) {
			continue
		}

		candidateSorted := sortString(candidateLower)

		if subjectSorted == candidateSorted {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}

func sortString(s string) string {
	r := []rune(s)
	sort.Slice(r, func(i, j int) bool {
		return r[i] < r[j]
	})
	return string(r)
}