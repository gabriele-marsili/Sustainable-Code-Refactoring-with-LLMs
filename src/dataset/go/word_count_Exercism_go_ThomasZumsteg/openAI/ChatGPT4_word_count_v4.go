package wordcount

import "unicode"

// TestVersion is the unit tests that this passes.
const TestVersion = 1

// Frequency tracks the occurrences of strings.
type Frequency map[string]int

// WordCount finds the frequency of words in a phrase.
func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	word := make([]rune, 0, len(phrase))
	for _, v := range phrase {
		if unicode.IsLetter(v) || unicode.IsDigit(v) {
			word = append(word, unicode.ToLower(v))
		} else if len(word) > 0 {
			counter[string(word)]++
			word = word[:0]
		}
	}
	if len(word) > 0 {
		counter[string(word)]++
	}
	return counter
}