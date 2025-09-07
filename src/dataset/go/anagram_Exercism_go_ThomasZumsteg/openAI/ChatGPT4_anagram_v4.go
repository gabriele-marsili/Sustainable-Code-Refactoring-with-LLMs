package anagram

import (
	"strings"
)

/*Detect finds any anagrams in a list of candidates, case insensitive*/
func Detect(subject string, candidates []string) []string {
	word := strings.ToLower(subject)
	wordSignature := signature(word)
	var anagrams []string
	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		if word != lowerCandidate && signature(lowerCandidate) == wordSignature {
			anagrams = append(anagrams, candidate)
		}
	}
	return anagrams
}

func signature(s string) string {
	counts := make([]int, 26)
	for _, r := range s {
		if r >= 'a' && r <= 'z' {
			counts[r-'a']++
		}
	}
	var result strings.Builder
	for i, count := range counts {
		if count > 0 {
			result.WriteByte(byte('a' + i))
			result.WriteString(strings.Repeat(string(byte('0'+count)), count))
		}
	}
	return result.String()
}