package yacht

import (
	"sort"
)

func Score(dice []int, category string) int {
	counts := [7]int{} // Assuming dice values are 1-6
	for _, die := range dice {
		counts[die]++
	}

	switch category {
	case "yacht":
		for _, count := range counts[1:] {
			if count == 5 {
				return 50
			}
		}
	case "ones":
		return counts[1]
	case "twos":
		return counts[2] * 2
	case "threes":
		return counts[3] * 3
	case "fours":
		return counts[4] * 4
	case "fives":
		return counts[5] * 5
	case "sixes":
		return counts[6] * 6
	case "full house":
		hasTwo := false
		hasThree := false
		sum := 0
		for i := 1; i < len(counts); i++ {
			if counts[i] == 2 {
				hasTwo = true
			} else if counts[i] == 3 {
				hasThree = true
			}
			sum += i * counts[i]
		}
		if hasTwo && hasThree {
			return sum
		}
	case "four of a kind":
		for i := 1; i < len(counts); i++ {
			if counts[i] >= 4 {
				return i * 4
			}
		}
	case "little straight":
		if counts[1] == 1 && counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 {
			return 30
		}
	case "big straight":
		if counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 && counts[6] == 1 {
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