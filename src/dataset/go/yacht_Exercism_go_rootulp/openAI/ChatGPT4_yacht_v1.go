package yacht

import (
	"log"
	"sort"
)

func Score(dice []int, category string) (score int) {
	switch category {
	case "ones", "twos", "threes", "fours", "fives", "sixes":
		return scoreSingles(dice, category)
	case "full house":
		return scoreFullHouse(dice)
	case "four of a kind":
		return scoreFourOfKind(dice)
	case "little straight":
		return scoreStraight(dice, []int{1, 2, 3, 4, 5}, 30)
	case "big straight":
		return scoreStraight(dice, []int{2, 3, 4, 5, 6}, 30)
	case "choice":
		return sum(dice)
	case "yacht":
		return scoreYacht(dice)
	default:
		log.Fatalf("unrecognized category %v", category)
		return 0
	}
}

func scoreSingles(dice []int, category string) int {
	target := int(category[0] - '0') // Convert "ones", "twos", etc. to 1, 2, ...
	return target * countOf(dice, target)
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

func scoreStraight(dice []int, target []int, score int) int {
	sort.Ints(dice)
	for i, v := range target {
		if dice[i] != v {
			return 0
		}
	}
	return score
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