package wordcount

import (
	"strings"
	"unicode"
)

// TestVersion is the unit tests that this passes.
const TestVersion = 1

// Frequency tracks the occurrences of strings.
type Frequency map[string]int

// WordCount finds the frequency of words in a phrase.
// Only letters and numbers are counted, punctuation is ignored.
func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	word := strings.Builder{}

	for _, v := range phrase {
		if unicode.IsLetter(v) || unicode.IsDigit(v) {
			word.WriteRune(unicode.ToLower(v))
		} else if word.Len() > 0 {
			counter[word.String()]++
			word.Reset()
		}
	}

	if word.Len() > 0 {
		counter[word.String()]++
	}

	return counter
}