package yacht

import (
	"sort"
)

func Score(dice []int, category string) (score int) {
	switch category {
	case "ones":
		return 1 * countOf(dice, 1)
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
		return 0
	}
}

func scoreFullHouse(dice []int) (score int) {
	counts := getOccurrences(dice)
	hasTwo := false
	hasThree := false
	for _, count := range counts {
		if count == 2 {
			hasTwo = true
		} else if count == 3 {
			hasThree = true
		} else {
			return 0
		}
	}
	if hasTwo && hasThree {
		return sum(dice)
	}
	return 0
}

func scoreFourOfKind(dice []int) (score int) {
	counts := getOccurrences(dice)
	for die, count := range counts {
		if count >= 4 {
			return die * 4
		}
	}
	return 0
}

func scoreLittleStraight(dice []int) (score int) {
	sort.Ints(dice)
	for i := 0; i < 5; i++ {
		if dice[i] != i+1 {
			return 0
		}
	}
	return 30
}

func scoreBigStraight(dice []int) (score int) {
	sort.Ints(dice)
	for i := 0; i < 5; i++ {
		if dice[i] != i+2 {
			return 0
		}
	}
	return 30
}

func scoreYacht(dice []int) (score int) {
	first := dice[0]
	for _, die := range dice {
		if die != first {
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

func getOccurrences(dice []int) map[int]int {
	counts := make(map[int]int, 6)
	for _, die := range dice {
		counts[die]++
	}
	return counts
}

func sum(dice []int) (result int) {
	for _, d := range dice {
		result += d
	}
	return result
}