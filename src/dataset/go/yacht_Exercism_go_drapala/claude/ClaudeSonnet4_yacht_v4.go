package yacht

func Score(dice []int, category string) int {
	switch category {
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
		return fullHouse(dice)
	case "four of a kind":
		return fourOfAKind(dice)
	case "little straight":
		return littleStraight(dice)
	case "big straight":
		return bigStraight(dice)
	case "choice":
		return sum(dice)
	case "yacht":
		return yacht(dice)
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

func sum(dice []int) int {
	total := 0
	for _, die := range dice {
		total += die
	}
	return total
}

func getCounts(dice []int) [7]int {
	var counts [7]int
	for _, die := range dice {
		counts[die]++
	}
	return counts
}

func fullHouse(dice []int) int {
	counts := getCounts(dice)
	hasTwo, hasThree := false, false
	for i := 1; i <= 6; i++ {
		if counts[i] == 2 {
			hasTwo = true
		} else if counts[i] == 3 {
			hasThree = true
		}
	}
	if hasTwo && hasThree {
		return 25
	}
	return 0
}

func fourOfAKind(dice []int) int {
	counts := getCounts(dice)
	for i := 1; i <= 6; i++ {
		if counts[i] >= 4 {
			return i * 4
		}
	}
	return 0
}

func littleStraight(dice []int) int {
	counts := getCounts(dice)
	if counts[1] >= 1 && counts[2] >= 1 && counts[3] >= 1 && counts[4] >= 1 && counts[5] >= 1 {
		return 30
	}
	return 0
}

func bigStraight(dice []int) int {
	counts := getCounts(dice)
	if counts[2] >= 1 && counts[3] >= 1 && counts[4] >= 1 && counts[5] >= 1 && counts[6] >= 1 {
		return 30
	}
	return 0
}

func yacht(dice []int) int {
	if len(dice) == 0 {
		return 0
	}
	first := dice[0]
	for _, die := range dice[1:] {
		if die != first {
			return 0
		}
	}
	return 50
}