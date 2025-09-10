package yacht

import (
	"log"
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
		log.Fatalf("unrecognized category %v", category)
		return 0
	}
}

func scoreFullHouse(dice []int) (score int) {
	diceToOccurrences := getOccurrences(dice)
	if len(diceToOccurrences) == 2 {
		for _, occurrences := range diceToOccurrences {
			if occurrences != 2 && occurrences != 3 {
				return 0
			}
		}
		return sum(dice)
	}
	return 0
}

func scoreFourOfKind(dice []int) (score int) {
	diceToOccurrences := getOccurrences(dice)
	for d, occurrences := range diceToOccurrences {
		if occurrences >= 4 {
			return d * 4
		}
	}
	return 0
}

func scoreLittleStraight(dice []int) (score int) {
	if isStraight(dice, []int{1, 2, 3, 4, 5}) {
		return 30
	}
	return 0
}

func scoreBigStraight(dice []int) (score int) {
	if isStraight(dice, []int{2, 3, 4, 5, 6}) {
		return 30
	}
	return 0
}

func scoreYacht(dice []int) (score int) {
	diceToOccurrences := getOccurrences(dice)
	if len(diceToOccurrences) == 1 {
		return 50
	}
	return 0
}

func countOf(dice []int, item int) (count int) {
	for _, d := range dice {
		if d == item {
			count++
		}
	}
	return count
}

func isStraight(dice, target []int) bool {
	sort.Ints(dice)
	for i := range dice {
		if dice[i] != target[i] {
			return false
		}
	}
	return true
}

func getOccurrences(dice []int) map[int]int {
	diceToOccurrences := make(map[int]int, len(dice))
	for _, d := range dice {
		diceToOccurrences[d]++
	}
	return diceToOccurrences
}

func sum(dice []int) (result int) {
	for _, d := range dice {
		result += d
	}
	return result
}