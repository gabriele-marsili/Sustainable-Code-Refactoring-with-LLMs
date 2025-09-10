package yacht

import "sort"

func Score(dice []int, category string) int {
	group := make(map[int]int, 6)
	sum := 0
	for _, die := range dice {
		group[die]++
		sum += die
	}

	switch category {
	case "yacht":
		for _, count := range group {
			if count == 5 {
				return 50
			}
		}
	case "ones", "twos", "threes", "fours", "fives", "sixes":
		target := int(category[0] - 'a' + 1)
		return group[target] * target
	case "full house":
		two, three := false, false
		for _, count := range group {
			if count == 2 {
				two = true
			} else if count == 3 {
				three = true
			}
		}
		if two && three {
			return sum
		}
	case "four of a kind":
		for k, count := range group {
			if count >= 4 {
				return k * 4
			}
		}
	case "little straight":
		if group[1] == 1 && group[2] == 1 && group[3] == 1 && group[4] == 1 && group[5] == 1 {
			return 30
		}
	case "big straight":
		if group[2] == 1 && group[3] == 1 && group[4] == 1 && group[5] == 1 && group[6] == 1 {
			return 30
		}
	case "choice":
		return sum
	}
	return 0
}