package scrabble

import "unicode"

var scrabbleLetterValues = [26]int{
	'A' - 'A': 1, 'E' - 'A': 1, 'I' - 'A': 1, 'O' - 'A': 1, 'U' - 'A': 1, 'L' - 'A': 1, 'N' - 'A': 1, 'R' - 'A': 1, 'S' - 'A': 1, 'T' - 'A': 1,
	'D' - 'A': 2, 'G' - 'A': 2,
	'B' - 'A': 3, 'C' - 'A': 3, 'M' - 'A': 3, 'P' - 'A': 3,
	'F' - 'A': 4, 'H' - 'A': 4, 'V' - 'A': 4, 'W' - 'A': 4, 'Y' - 'A': 4,
	'K' - 'A': 5,
	'J' - 'A': 8, 'X' - 'A': 8,
	'Q' - 'A': 10, 'Z' - 'A': 10,
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