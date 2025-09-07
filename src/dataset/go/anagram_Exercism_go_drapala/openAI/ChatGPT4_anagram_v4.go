package anagram

import (
	"strings"
)

func getFreq(s string) [26]int {
	var freq [26]int
	for _, r := range s {
		if r >= 'a' && r <= 'z' {
			freq[r-'a']++
		}
	}
	return freq
}

func Detect(subject string, candidates []string) []string {
	var result []string
	subject = strings.ToLower(subject)
	subjectFreq := getFreq(subject)

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		if candidateLower != subject && getFreq(candidateLower) == subjectFreq {
			result = append(result, candidate)
		}
	}

	return result
}