package anagram

import (
	"strings"
)

func Detect(subject string, candidates []string) (anagrams []string) {
	subject = strings.ToLower(subject)
	subjectCount := getCharCount(subject)
	for _, c := range candidates {
		lowerC := strings.ToLower(c)
		if lowerC != subject && len(lowerC) == len(subject) && isAnagram(subjectCount, getCharCount(lowerC)) {
			anagrams = append(anagrams, c)
		}
	}
	return anagrams
}

func getCharCount(input string) [26]int {
	var count [26]int
	for _, r := range input {
		if r >= 'a' && r <= 'z' {
			count[r-'a']++
		}
	}
	return count
}

func isAnagram(count1, count2 [26]int) bool {
	for i := 0; i < 26; i++ {
		if count1[i] != count2[i] {
			return false
		}
	}
	return true
}