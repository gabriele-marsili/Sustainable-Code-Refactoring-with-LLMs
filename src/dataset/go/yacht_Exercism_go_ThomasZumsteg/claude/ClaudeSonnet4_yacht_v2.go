package yacht

import "sort"

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
		count := 0
		for _, die := range dice {
			if die == 1 {
				count++
			}
		}
		return count
	case "twos":
		count := 0
		for _, die := range dice {
			if die == 2 {
				count++
			}
		}
		return count * 2
	case "threes":
		count := 0
		for _, die := range dice {
			if die == 3 {
				count++
			}
		}
		return count * 3
	case "fours":
		count := 0
		for _, die := range dice {
			if die == 4 {
				count++
			}
		}
		return count * 4
	case "fives":
		count := 0
		for _, die := range dice {
			if die == 5 {
				count++
			}
		}
		return count * 5
	case "sixes":
		count := 0
		for _, die := range dice {
			if die == 6 {
				count++
			}
		}
		return count * 6
	case "full house":
		group := [7]int{}
		sum := 0
		for _, die := range dice {
			group[die]++
			sum += die
		}
		hasTwo, hasThree := false, false
		for i := 1; i <= 6; i++ {
			if group[i] == 2 {
				hasTwo = true
			} else if group[i] == 3 {
				hasThree = true
			} else if group[i] != 0 {
				return 0
			}
		}
		if hasTwo && hasThree {
			return sum
		}
	case "four of a kind":
		group := [7]int{}
		for _, die := range dice {
			group[die]++
		}
		for i := 1; i <= 6; i++ {
			if group[i] >= 4 {
				return i * 4
			}
		}
	case "little straight":
		sort.Ints(dice)
		if dice[0] == 1 && dice[1] == 2 && dice[2] == 3 && dice[3] == 4 && dice[4] == 5 {
			return 30
		}
	case "big straight":
		sort.Ints(dice)
		if dice[0] == 2 && dice[1] == 3 && dice[2] == 4 && dice[3] == 5 && dice[4] == 6 {
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