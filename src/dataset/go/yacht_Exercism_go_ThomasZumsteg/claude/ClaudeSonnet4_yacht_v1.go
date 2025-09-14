package yacht

import "sort"

func Score(dice []int, catagory string) int {
	switch catagory {
	case "choice":
		sum := 0
		for _, die := range dice {
			sum += die
		}
		return sum
	case "little straight":
		if len(dice) == 5 {
			sort.Ints(dice)
			if dice[0] == 1 && dice[1] == 2 && dice[2] == 3 && dice[3] == 4 && dice[4] == 5 {
				return 30
			}
		}
		return 0
	case "big straight":
		if len(dice) == 5 {
			sort.Ints(dice)
			if dice[0] == 2 && dice[1] == 3 && dice[2] == 4 && dice[3] == 5 && dice[4] == 6 {
				return 30
			}
		}
		return 0
	}

	group := make(map[int]int, 6)
	for _, die := range dice {
		group[die]++
	}

	switch catagory {
	case "yacht":
		for _, count := range group {
			if count == 5 {
				return 50
			}
		}
	case "ones":
		return group[1]
	case "twos":
		return group[2] * 2
	case "threes":
		return group[3] * 3
	case "fours":
		return group[4] * 4
	case "fives":
		return group[5] * 5
	case "sixes":
		return group[6] * 6
	case "full house":
		if len(group) == 2 {
			score := 0
			hasTwo, hasThree := false, false
			for value, count := range group {
				score += value * count
				if count == 2 {
					hasTwo = true
				} else if count == 3 {
					hasThree = true
				}
			}
			if hasTwo && hasThree {
				return score
			}
		}
	case "four of a kind":
		for value, count := range group {
			if count >= 4 {
				return value * 4
			}
		}
	}
	return 0
}