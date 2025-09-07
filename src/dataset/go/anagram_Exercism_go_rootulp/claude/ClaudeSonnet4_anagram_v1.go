package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subjectLower := strings.ToLower(subject)
	subjectOccurrences := getOccurences(subjectLower)
	
	for _, c := range candidates {
		if len(c) != len(subject) {
			continue
		}
		
		candidateLower := strings.ToLower(c)
		if subjectLower == candidateLower {
			continue
		}
		
		candidateOccurrences := getOccurences(candidateLower)
		if mapsEqual(subjectOccurrences, candidateOccurrences) {
			anagrams = append(anagrams, c)
		}
	}
	return anagrams
}

func getOccurences(input string) map[rune]int {
	occurrences := make(map[rune]int, len(input))
	for _, r := range input {
		occurrences[r]++
	}
	return occurrences
}

func mapsEqual(a, b map[rune]int) bool {
	if len(a) != len(b) {
		return false
	}
	for k, v := range a {
		if b[k] != v {
			return false
		}
	}
	return true
}