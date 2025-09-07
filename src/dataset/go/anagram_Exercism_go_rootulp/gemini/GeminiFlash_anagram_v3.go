package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subjectLower := strings.ToLower(subject)
	subjectOccurrences := getOccurrences(subjectLower)
	subjectLen := len(subjectLower)

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		if len(candidateLower) != subjectLen || strings.EqualFold(subject, candidate) {
			continue
		}

		candidateOccurrences := getOccurrences(candidateLower)
		if areMapsEqual(subjectOccurrences, candidateOccurrences) {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}

func getOccurrences(input string) map[rune]int {
	occurrences := make(map[rune]int, len(input))
	for _, r := range input {
		occurrences[r]++
	}
	return occurrences
}

func areMapsEqual(map1, map2 map[rune]int) bool {
	if len(map1) != len(map2) {
		return false
	}
	for key, value1 := range map1 {
		value2, ok := map2[key]
		if !ok || value1 != value2 {
			return false
		}
	}
	return true
}