package scrabble

import "unicode"

var scrabbleLetterValues = [26]int{
	1, // A
	3, // B
	3, // C
	2, // D
	1, // E
	4, // F
	2, // G
	4, // H
	1, // I
	8, // J
	5, // K
	1, // L
	3, // M
	1, // N
	1, // O
	3, // P
	10, // Q
	1, // R
	1, // S
	1, // T
	1, // U
	4, // V
	4, // W
	8, // X
	4, // Y
	10, // Z
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