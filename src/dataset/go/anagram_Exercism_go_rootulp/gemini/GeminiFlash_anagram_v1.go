package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subjectLower := strings.ToLower(subject)
	subjectCounts := getOccurrences(subjectLower)
	subjectLen := len(subjectLower)

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		if len(candidateLower) != subjectLen || strings.EqualFold(subject, candidate) {
			continue
		}

		candidateCounts := getOccurrences(candidateLower)

		if areMapsEqual(subjectCounts, candidateCounts) {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}

func getOccurrences(s string) map[rune]int {
	counts := make(map[rune]int, len(s))
	for _, r := range s {
		counts[r]++
	}
	return counts
}

func areMapsEqual(map1, map2 map[rune]int) bool {
	if len(map1) != len(map2) {
		return false
	}
	for key, val1 := range map1 {
		if val2, ok := map2[key]; !ok || val1 != val2 {
			return false
		}
	}
	return true
}