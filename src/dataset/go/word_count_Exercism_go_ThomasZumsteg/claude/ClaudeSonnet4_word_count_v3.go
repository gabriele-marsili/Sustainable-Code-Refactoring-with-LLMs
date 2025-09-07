package wordcount

import (
	"strings"
	"unicode"
)

//TestVersion is the unit tests that this passes.
const TestVersion = 1

//Frequency tracks the occurances of strings.
type Frequency map[string]int

/*WordCount finds the frequency of words in a phrase
only letters and numbers are counted, punctuation is ignored*/
func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	var word strings.Builder
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word.WriteRune(unicode.ToLower(r))
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

/*splitWords divides a string into a sequence of words. Continuous
sequences of letters and digits are counted as words*/
func splitWords(phrase string) []string {
	if len(phrase) == 0 {
		return nil
	}
	
	words := make([]string, 0, estimateWordCount(phrase))
	var word strings.Builder
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word.WriteRune(unicode.ToLower(r))
		} else if word.Len() > 0 {
			words = append(words, word.String())
			word.Reset()
		}
	}
	
	if word.Len() > 0 {
		words = append(words, word.String())
	}
	
	return words
}

func estimateWordCount(phrase string) int {
	if len(phrase) == 0 {
		return 0
	}
	return len(phrase)/5 + 1
}