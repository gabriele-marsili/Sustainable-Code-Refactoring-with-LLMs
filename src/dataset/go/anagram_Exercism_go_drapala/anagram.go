package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) []string {
	subject = strings.ToLower(subject)
	subjectFreq := make(map[rune]int)
	for _, r := range subject {
		subjectFreq[r]++
	}
	
	result := make([]string, 0, len(candidates))
	
	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		
		if subject == candidateLower {
			continue
		}
		
		if len(subject) != len(candidateLower) {
			continue
		}
		
		candidateFreq := make(map[rune]int)
		for _, r := range candidateLower {
			candidateFreq[r]++
		}
		
		if len(subjectFreq) != len(candidateFreq) {
			continue
		}
		
		isAnagram := true
		for r, count := range subjectFreq {
			if candidateFreq[r] != count {
				isAnagram = false
				break
			}
		}
		
		if isAnagram {
			result = append(result, candidate)
		}
	}
	
	return result
}