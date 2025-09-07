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
		lowerCandidate := strings.ToLower(candidate)
		if subject == lowerCandidate {
			continue
		}

		if len(subject) != len(lowerCandidate) {
			continue
		}

		candidateFreq := make(map[rune]int)
		for _, r := range lowerCandidate {
			candidateFreq[r]++
		}

		isAnagram := true
		if len(subjectFreq) != len(candidateFreq) {
			isAnagram = false
		} else {
			for r, count := range subjectFreq {
				if candidateFreq[r] != count {
					isAnagram = false
					break
				}
			}
		}

		if isAnagram {
			result = append(result, candidate)
		}
	}
	return result
}