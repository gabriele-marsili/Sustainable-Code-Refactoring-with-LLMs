package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) []string {
	var result []string
	
	subjectLower := strings.ToLower(subject)
	subjectFreq := getFreq(subjectLower)
	
	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		
		// Skip if same as subject or different length
		if subjectLower == candidateLower || len(subjectLower) != len(candidateLower) {
			continue
		}
		
		// Compare frequency maps
		if mapsEqual(subjectFreq, getFreq(candidateLower)) {
			result = append(result, candidate)
		}
	}
	
	return result
}

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