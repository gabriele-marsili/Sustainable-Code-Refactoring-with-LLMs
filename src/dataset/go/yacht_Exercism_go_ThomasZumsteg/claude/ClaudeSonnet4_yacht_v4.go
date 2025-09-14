package yacht

func Score(dice []int, catagory string) int {
	switch catagory {
	case "yacht":
		first := dice[0]
		for i := 1; i < 5; i++ {
			if dice[i] != first {
				return 0
			}
		}
		return 50
	case "ones":
		return countValue(dice, 1)
	case "twos":
		return countValue(dice, 2) * 2
	case "threes":
		return countValue(dice, 3) * 3
	case "fours":
		return countValue(dice, 4) * 4
	case "fives":
		return countValue(dice, 5) * 5
	case "sixes":
		return countValue(dice, 6) * 6
	case "full house":
		counts := [7]int{}
		sum := 0
		for _, die := range dice {
			counts[die]++
			sum += die
		}
		hasTwo, hasThree := false, false
		for i := 1; i <= 6; i++ {
			if counts[i] == 2 {
				hasTwo = true
			} else if counts[i] == 3 {
				hasThree = true
			} else if counts[i] != 0 {
				return 0
			}
		}
		if hasTwo && hasThree {
			return sum
		}
	case "four of a kind":
		counts := [7]int{}
		for _, die := range dice {
			counts[die]++
		}
		for i := 1; i <= 6; i++ {
			if counts[i] >= 4 {
				return i * 4
			}
		}
	case "little straight":
		if hasStraight(dice, 1, 5) {
			return 30
		}
	case "big straight":
		if hasStraight(dice, 2, 6) {
			return 30
		}
	case "choice":
		sum := 0
		for _, die := range dice {
			sum += die
		}
		return sum
	}
	return 0
}

func countValue(dice []int, value int) int {
	count := 0
	for _, die := range dice {
		if die == value {
			count++
		}
	}
	return count
}

func hasStraight(dice []int, start, end int) bool {
	present := [7]bool{}
	for _, die := range dice {
		present[die] = true
	}
	for i := start; i <= end; i++ {
		if !present[i] {
			return false
		}
	}
	return true
}