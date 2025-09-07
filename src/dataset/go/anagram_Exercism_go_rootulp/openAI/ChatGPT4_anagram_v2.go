package anagram

import (
	"sort"
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subject = strings.ToLower(subject)
	sortedSubject := sortString(subject)

	for _, c := range candidates {
		lowerC := strings.ToLower(c)
		if lowerC != subject && sortedSubject == sortString(lowerC) {
			anagrams = append(anagrams, c)
		}
	}
	return anagrams
}

func sortString(input string) string {
	runes := []rune(input)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	return string(runes)
}