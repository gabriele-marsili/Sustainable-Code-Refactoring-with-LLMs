package yacht

import (
	"log"
)

func Score(dice []int, category string) (score int) {
	switch category {
	case "ones":
		return countOf(dice, 1)
	case "twos":
		return 2 * countOf(dice, 2)
	case "threes":
		return 3 * countOf(dice, 3)
	case "fours":
		return 4 * countOf(dice, 4)
	case "fives":
		return 5 * countOf(dice, 5)
	case "sixes":
		return 6 * countOf(dice, 6)
	case "full house":
		return scoreFullHouse(dice)
	case "four of a kind":
		return scoreFourOfKind(dice)
	case "little straight":
		return scoreLittleStraight(dice)
	case "big straight":
		return scoreBigStraight(dice)
	case "choice":
		return sum(dice)
	case "yacht":
		return scoreYacht(dice)
	default:
		log.Fatalf("unrecognized category %v", category)
		return 0
	}
}

func scoreFullHouse(dice []int) (score int) {
	counts := [7]int{}
	total := 0
	for _, d := range dice {
		counts[d]++
		total += d
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
		return total
	}
	return 0
}

func scoreFourOfKind(dice []int) (score int) {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	for i := 1; i <= 6; i++ {
		if counts[i] >= 4 {
			return i * 4
		}
	}
	return 0
}

func scoreLittleStraight(dice []int) (score int) {
	if isLittleStraight(dice) {
		return 30
	}
	return 0
}

func scoreBigStraight(dice []int) (score int) {
	if isBigStraight(dice) {
		return 30
	}
	return 0
}

func scoreYacht(dice []int) (score int) {
	if len(dice) == 0 {
		return 0
	}
	first := dice[0]
	for _, d := range dice[1:] {
		if d != first {
			return 0
		}
	}
	return 50
}

func countOf(dice []int, item int) (count int) {
	for _, d := range dice {
		if d == item {
			count++
		}
	}
	return count
}

func isLittleStraight(dice []int) bool {
	present := [7]bool{}
	for _, d := range dice {
		present[d] = true
	}
	return present[1] && present[2] && present[3] && present[4] && present[5]
}

func isBigStraight(dice []int) bool {
	present := [7]bool{}
	for _, d := range dice {
		present[d] = true
	}
	return present[2] && present[3] && present[4] && present[5] && present[6]
}

func sum(dice []int) (result int) {
	for _, d := range dice {
		result += d
	}
	return result
}