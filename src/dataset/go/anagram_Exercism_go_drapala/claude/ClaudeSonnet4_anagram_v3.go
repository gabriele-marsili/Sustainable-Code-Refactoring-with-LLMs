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
	if len(candidates) == 0 {
		return nil
	}

	subjectLower := strings.ToLower(subject)
	subjectFreq := getFreq(subjectLower)
	
	result := make([]string, 0, len(candidates))

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		
		if subjectLower == candidateLower {
			continue
		}
		
		if len(candidateLower) != len(subjectLower) {
			continue
		}
		
		candidateFreq := getFreq(candidateLower)
		
		if mapsEqual(subjectFreq, candidateFreq) {
			result = append(result, candidate)
		}
	}
	
	return result
}