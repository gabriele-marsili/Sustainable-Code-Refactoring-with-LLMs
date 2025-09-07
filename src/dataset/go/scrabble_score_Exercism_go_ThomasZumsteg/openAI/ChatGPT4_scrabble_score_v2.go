package scrabble_score

/*Score determines the value of a scrabble word*/
func Score(word string) int {
	score := 0
	for i := 0; i < len(word); i++ {
		score += letterScores[word[i]&31]
	}
	return score
}

//letterScores sets the value of letters
var letterScores = [27]int{
	0, 1, 3, 3, 2, 1, 4, 2, 4, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10,
}