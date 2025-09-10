package yacht

func Score(dice []int, category string) int {
	counts := make(map[int]int)
	for _, die := range dice {
		counts[die]++
	}

	switch category {
	case "Yacht":
		if len(counts) == 1 {
			return 50
		}
		return 0
	case "Full House":
		hasTwo := false
		hasThree := false
		for _, count := range counts {
			if count == 2 {
				hasTwo = true
			} else if count == 3 {
				hasThree = true
			} else {
				return 0
			}
		}
		if hasTwo && hasThree {
			sum := 0
			for _, die := range dice {
				sum += die
			}
			return sum
		}
		return 0
	case "Four of a Kind":
		for die, count := range counts {
			if count >= 4 {
				return die * 4
			}
		}
		return 0
	case "Little Straight":
		if counts[1] == 1 && counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 {
			return 30
		}
		return 0
	case "Big Straight":
		if counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 && counts[6] == 1 {
			return 30
		}
		return 0
	case "Choice":
		sum := 0
		for _, die := range dice {
			sum += die
		}
		return sum
	default:
		num, ok := map[string]int{
			"Ones":   1,
			"Twos":   2,
			"Threes": 3,
			"Fours":  4,
			"Fives":  5,
			"Sixes":  6,
		}[category]
		if !ok {
			return 0
		}
		score := 0
		for _, die := range dice {
			if die == num {
				score += num
			}
		}
		return score
	}
}