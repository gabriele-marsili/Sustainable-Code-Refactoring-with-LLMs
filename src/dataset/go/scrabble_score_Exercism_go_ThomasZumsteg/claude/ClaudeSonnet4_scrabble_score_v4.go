package scrabble_score

var letterScores = [26]int{
	1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
	1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10,
}

func Score(word string) int {
	score := 0
	for i := 0; i < len(word); i++ {
		c := word[i]
		if c >= 'a' && c <= 'z' {
			score += letterScores[c-'a']
		} else if c >= 'A' && c <= 'Z' {
			score += letterScores[c-'A']
		}
	}
	return score
}