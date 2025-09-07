package anagram

import (
	"strings"
)

func getFreq(s string) map[rune]int {
	freq := make(map[rune]int, len(s))
	for _, r := range s {
		freq[r]++
	}
	return freq
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

func Detect(subject string, candidates []string) []string {
	var result []string
	
	subjectLower := strings.ToLower(subject)
	subjectFreq := getFreq(subjectLower)

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		
		// Skip if candidate is exactly same as subject
		if subjectLower == candidateLower {
			continue
		}
		
		// Quick length check before computing frequency
		if len(subjectLower) != len(candidateLower) {
			continue
		}
		
		candidateFreq := getFreq(candidateLower)
		
		if mapsEqual(subjectFreq, candidateFreq) {
			result = append(result, candidate)
		}
	}
	
	return result
}