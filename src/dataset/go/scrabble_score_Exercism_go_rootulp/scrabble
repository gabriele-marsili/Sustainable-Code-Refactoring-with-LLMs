package scrabble

import "unicode"

var scrabbleLetterValues = [26]int{
	1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10,
}

// Score returns the Scrabble score for the provided word.
func Score(word string) int {
	score := 0
	for _, c := range word {
		if c >= 'a' && c <= 'z' {
			score += scrabbleLetterValues[c-'a']
		} else if c >= 'A' && c <= 'Z' {
			score += scrabbleLetterValues[c-'A']
		}
	}
	return score
}