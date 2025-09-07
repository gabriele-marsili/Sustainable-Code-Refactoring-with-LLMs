package wordcount

import "unicode"

const TestVersion = 1

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	counter := make(Frequency)
	word := make([]rune, 0, len(phrase))
	for _, v := range phrase + " " {
		if unicode.IsLetter(v) || unicode.IsDigit(v) {
			word = append(word, unicode.ToLower(v))
		} else if len(word) > 0 {
			counter[string(word)]++
			word = word[:0]
		}
	}
	return counter
}