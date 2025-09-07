package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subjectLower := strings.ToLower(subject)
	subjectLen := len(subjectLower)
	subjectOccurences := getOccurences(subjectLower)
	
	for _, c := range candidates {
		if len(c) != subjectLen || strings.EqualFold(subject, c) {
			continue
		}
		
		candidateLower := strings.ToLower(c)
		if compareOccurences(subjectOccurences, candidateLower) {
			anagrams = append(anagrams, c)
		}
	}
	return anagrams
}

func getOccurences(input string) map[rune]int {
	occurences := make(map[rune]int, len(input))
	for _, r := range input {
		occurences[r]++
	}
	return occurences
}

func compareOccurences(expected map[rune]int, candidate string) bool {
	actual := make(map[rune]int, len(candidate))
	for _, r := range candidate {
		actual[r]++
	}
	
	if len(expected) != len(actual) {
		return false
	}
	
	for k, v := range expected {
		if actual[k] != v {
			return false
		}
	}
	return true
}