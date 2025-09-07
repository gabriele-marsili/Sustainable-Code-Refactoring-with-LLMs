package wordcount

import "unicode"

//TestVersion is the unit tests that this passes.
const TestVersion = 1

//Frequency tracks the occurances of strings.
type Frequency map[string]int

/*WordCount finds the frequency of words in a phrase
only letters and numbers are counted, punctuation is ignored*/
func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	var word []rune
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word = append(word, unicode.ToLower(r))
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

/*splitWords divides a string into a sequence of words. Continuous
sequences of letters and digits are counted as words*/
func splitWords(phrase string) []string {
	var words []string
	var word []rune
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			word = append(word, unicode.ToLower(r))
		} else if len(word) > 0 {
			words = append(words, string(word))
			word = word[:0]
		}
	}
	
	if len(word) > 0 {
		words = append(words, string(word))
	}
	
	return words
}