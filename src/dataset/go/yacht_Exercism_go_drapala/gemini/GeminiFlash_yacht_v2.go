package yacht

func Score(dice []int, category string) int {
	counts := make(map[int]int)
	for _, die := range dice {
		counts[die]++
	}

	switch category {
	case "yacht":
		if len(counts) == 1 {
			return 50
		}
		return 0
	case "full house":
		hasThree := false
		hasTwo := false
		for _, count := range counts {
			if count == 5 || count == 4 {
				return 0
			}
			if count == 3 {
				hasThree = true
			}
			if count == 2 {
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
	case "four of a kind":
		for die, count := range counts {
			if count >= 4 {
				return die * 4
			}
		}
		return 0
	case "little straight":
		if counts[1] == 1 && counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 {
			return 30
		}
		return 0
	case "big straight":
		if counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 && counts[6] == 1 {
			return 30
		}
		return 0
	case "choice":
		sum := 0
		for _, die := range dice {
			sum += die
		}
		return sum
	default:
		num, ok := map[string]int{
			"ones":   1,
			"twos":   2,
			"threes": 3,
			"fours":  4,
			"fives":  5,
			"sixes":  6,
		}[category]
		if !ok {
			return 0 // Or panic, depending on desired behavior for invalid categories
		}
		count := 0
		for _, die := range dice {
			if die == num {
				count += num
			}
		}
		return count
	}
}