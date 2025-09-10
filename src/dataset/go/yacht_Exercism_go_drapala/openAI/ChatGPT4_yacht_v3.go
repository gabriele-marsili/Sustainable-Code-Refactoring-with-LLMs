package yacht

func Score(dice []int, category string) int {
	switch category {
	case "ones":
		return sumMatching(dice, 1)
	case "twos":
		return sumMatching(dice, 2)
	case "threes":
		return sumMatching(dice, 3)
	case "fours":
		return sumMatching(dice, 4)
	case "fives":
		return sumMatching(dice, 5)
	case "sixes":
		return sumMatching(dice, 6)
	case "full house":
		return fullHouseScore(dice)
	case "four of a kind":
		return fourOfAKindScore(dice)
	case "little straight":
		if isStraight(dice, []int{1, 2, 3, 4, 5}) {
			return 30
		}
	case "big straight":
		if isStraight(dice, []int{2, 3, 4, 5, 6}) {
			return 30
		}
	case "choice":
		return sum(dice)
	case "yacht":
		if allEqual(dice) {
			return 50
		}
	}
	return 0
}

func sumMatching(dice []int, target int) int {
	sum := 0
	for _, d := range dice {
		if d == target {
			sum += d
		}
	}
	return sum
}

func fullHouseScore(dice []int) int {
	counts := countOccurrences(dice)
	if len(counts) == 2 {
		for _, count := range counts {
			if count != 2 && count != 3 {
				return 0
			}
		}
		return sum(dice)
	}
	return 0
}

func fourOfAKindScore(dice []int) int {
	counts := countOccurrences(dice)
	for num, count := range counts {
		if count >= 4 {
			return num * 4
		}
	}
	return 0
}

func isStraight(dice []int, target []int) bool {
	counts := countOccurrences(dice)
	for _, num := range target {
		if counts[num] != 1 {
			return false
		}
	}
	return true
}

func allEqual(dice []int) bool {
	for i := 1; i < len(dice); i++ {
		if dice[i] != dice[0] {
			return false
		}
	}
	return true
}

func sum(dice []int) int {
	total := 0
	for _, d := range dice {
		total += d
	}
	return total
}

func countOccurrences(dice []int) map[int]int {
	counts := make(map[int]int, 6)
	for _, d := range dice {
		counts[d]++
	}
	return counts
}