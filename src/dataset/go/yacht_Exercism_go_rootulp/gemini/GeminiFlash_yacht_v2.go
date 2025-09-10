package yacht

import (
	"sort"
)

func Score(dice []int, category string) int {
	switch category {
	case "ones":
		return scoreNumbers(dice, 1)
	case "twos":
		return scoreNumbers(dice, 2)
	case "threes":
		return scoreNumbers(dice, 3)
	case "fours":
		return scoreNumbers(dice, 4)
	case "fives":
		return scoreNumbers(dice, 5)
	case "sixes":
		return scoreNumbers(dice, 6)
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

func scoreNumbers(dice []int, number int) int {
	score := 0
	for _, die := range dice {
		if die == number {
			score += number
		}
	}
	return score
}

func scoreFullHouse(dice []int) int {
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

func scoreFourOfKind(dice []int) int {
	counts := getOccurrences(dice)
	for die, count := range counts {
		if count >= 4 {
			return die * 4
		}
	}
	return 0
}

func scoreLittleStraight(dice []int) int {
	sort.Ints(dice)
	for i := 0; i < 5; i++ {
		if dice[i] != i+1 {
			return 0
		}
	}
	return 30
}

func scoreBigStraight(dice []int) int {
	sort.Ints(dice)
	for i := 0; i < 5; i++ {
		if dice[i] != i+2 {
			return 0
		}
	}
	return 30
}

func scoreYacht(dice []int) int {
	first := dice[0]
	for _, die := range dice {
		if die != first {
			return 0
		}
	}
	return 50
}

func getOccurrences(dice []int) map[int]int {
	counts := make(map[int]int)
	for _, die := range dice {
		counts[die]++
	}
	return counts
}

func sum(dice []int) int {
	sum := 0
	for _, die := range dice {
		sum += die
	}
	return sum
}