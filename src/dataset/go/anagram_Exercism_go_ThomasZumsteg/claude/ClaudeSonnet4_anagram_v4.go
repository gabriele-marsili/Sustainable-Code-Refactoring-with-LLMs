package anagram

import (
	"sort"
	"strings"
)

type letters []rune

func (s letters) Len() int           { return len(s) }
func (s letters) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
func (s letters) Less(i, j int) bool { return s[i] < s[j] }

func Detect(subject string, candidates []string) []string {
	if len(candidates) == 0 {
		return nil
	}
	
	word := strings.ToLower(subject)
	wordRunes := []rune(word)
	sort.Slice(wordRunes, func(i, j int) bool { return wordRunes[i] < wordRunes[j] })
	wordSorted := string(wordRunes)
	
	anagrams := make([]string, 0, len(candidates))
	
	for _, candidate := range candidates {
		lowerCandidate := strings.ToLower(candidate)
		
		if len(lowerCandidate) != len(word) || word == lowerCandidate {
			continue
		}
		
		candidateRunes := []rune(lowerCandidate)
		sort.Slice(candidateRunes, func(i, j int) bool { return candidateRunes[i] < candidateRunes[j] })
		
		if string(candidateRunes) == wordSorted {
			anagrams = append(anagrams, candidate)
		}
	}
	
	return anagrams
}