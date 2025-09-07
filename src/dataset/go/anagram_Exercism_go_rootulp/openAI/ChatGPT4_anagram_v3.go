package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subject = strings.ToLower(subject)
	subjectCount := countRunes(subject)
	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)
		if subject != candidateLower && equalCounts(subjectCount, countRunes(candidateLower)) {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}

func countRunes(input string) [26]int {
	var counts [26]int
	for _, r := range input {
		if r >= 'a' && r <= 'z' {
			counts[r-'a']++
		}
	}
	return counts
}

func equalCounts(a, b [26]int) bool {
	for i := 0; i < 26; i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}