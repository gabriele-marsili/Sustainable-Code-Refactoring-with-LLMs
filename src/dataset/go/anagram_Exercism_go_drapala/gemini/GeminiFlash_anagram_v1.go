package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) []string {
	subject = strings.ToLower(subject)
	subjectRuneCount := runeCount(subject)
	result := make([]string, 0, len(candidates))

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)

		if subject == candidateLower {
			continue
		}

		if len(subject) != len(candidateLower) {
			continue
		}

		if isAnagram(subjectRuneCount, candidateLower) {
			result = append(result, candidate)
		}
	}

	return result
}

func runeCount(s string) map[rune]int {
	result := make(map[rune]int)
	for _, r := range s {
		result[r]++
	}
	return result
}

func isAnagram(subjectRuneCount map[rune]int, candidate string) bool {
	candidateRuneCount := make(map[rune]int)
	for _, r := range candidate {
		candidateRuneCount[r]++
	}

	if len(subjectRuneCount) != len(candidateRuneCount) {
		return false
	}

	for r, count := range subjectRuneCount {
		if candidateRuneCount[r] != count {
			return false
		}
	}

	return true
}