package scrabble

var scores = [26]int{
	1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10,
}

func Score(word string) int {
	points := 0
	for i := 0; i < len(word); i++ {
		char := word[i]
		if char >= 'a' && char <= 'z' {
			points += scores[char-'a']
		} else if char >= 'A' && char <= 'Z' {
			points += scores[char-'A']
		}
	}
	return points
}