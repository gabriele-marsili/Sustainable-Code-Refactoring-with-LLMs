package yacht

func Score(dice []int, category string) int {
	counts := make([]int, 7)
	for _, die := range dice {
		counts[die]++
	}

	switch category {
	case "Yacht":
		for i := 1; i <= 6; i++ {
			if counts[i] == 5 {
				return 50
			}
		}
		return 0
	case "Full House":
		hasThree := false
		hasTwo := false
		for i := 1; i <= 6; i++ {
			if counts[i] == 3 {
				hasThree = true
			} else if counts[i] == 2 {
				hasTwo = true
			}
		}
		if hasThree && hasTwo {
			sum := 0
			for _, die := range dice {
				sum += die
			}
			return sum
		}
		return 0
	case "Four of a Kind":
		for i := 1; i <= 6; i++ {
			if counts[i] >= 4 {
				return i * 4
			}
		}
		return 0
	case "Little Straight":
		for i := 1; i <= 6; i++ {
			if counts[i] != 1 {
				return 0
			}
		}
		return 30
	case "Big Straight":
		for i := 2; i <= 6; i++ {
			if counts[i] != 1 {
				return 0
			}
		}
		if counts[1] == 0 && counts[6] == 1 {
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
		return counts[num] * num
	}
}