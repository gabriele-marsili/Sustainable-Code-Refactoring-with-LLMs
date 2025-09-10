package yacht

func Score(dice []int, category string) int {
	if len(dice) != 5 {
		return 0
	}

	counts := make([]int, 7)
	for _, die := range dice {
		if die < 1 || die > 6 {
			return 0
		}
		counts[die]++
	}

	switch category {
	case "Ones":
		return counts[1]
	case "Twos":
		return counts[2] * 2
	case "Threes":
		return counts[3] * 3
	case "Fours":
		return counts[4] * 4
	case "Fives":
		return counts[5] * 5
	case "Sixes":
		return counts[6] * 6
	case "Full House":
		two, three := false, false
		for _, count := range counts {
			if count == 2 {
				two = true
			} else if count == 3 {
				three = true
			}
		}
		if two && three {
			return sum(dice)
		}
	case "Four of a Kind":
		for i, count := range counts {
			if count >= 4 {
				return i * 4
			}
		}
	case "Little Straight":
		if counts[1] == 1 && counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 {
			return 30
		}
	case "Big Straight":
		if counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 && counts[6] == 1 {
			return 30
		}
	case "Choice":
		return sum(dice)
	case "Yacht":
		for _, count := range counts {
			if count == 5 {
				return 50
			}
		}
	}
	return 0
}

func sum(dice []int) int {
	total := 0
	for _, die := range dice {
		total += die
	}
	return total
}