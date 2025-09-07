package wordcount

import (
	"strings"
	"unicode"
)

// TestVersion is the unit tests that this passes.
const TestVersion = 1

// Frequency tracks the occurances of strings.
type Frequency map[string]int

/*WordCount finds the frequency of words in a phrase
only letters and numbers are counted, punctuation is ignored*/
func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	for _, word := range splitWords(phrase) {
		counter[word]++
	}
	return counter
}

/*splitWords divides a string into a sequence of words. Continuous
sequences of letters and digits are counted as words*/
func splitWords(phrase string) []string {
	words := make([]string, 0, len(phrase)/4) // Pre-allocate slice for efficiency
	start := -1

	for i, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			r = unicode.ToLower(r)
			if start == -1 {
				start = i
			}
			continue
		}
		if start != -1 {
			words = append(words, strings.ToLower(phrase[start:i]))
			start = -1
		}
	}

	// Handle the case where the last word extends to the end of the phrase
	if start != -1 {
		words = append(words, strings.ToLower(phrase[start:]))
	}

	return words
}