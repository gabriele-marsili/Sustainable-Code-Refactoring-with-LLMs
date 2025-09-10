package yacht

import (
	"log"
	"sort"
)

func Score(dice []int, category string) (score int) {
	switch category {
	case "ones", "twos", "threes", "fours", "fives", "sixes":
		return scoreSingles(dice, int(category[0]-'a'+1))
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

func scoreSingles(dice []int, value int) int {
	count := 0
	for _, d := range dice {
		if d == value {
			count++
		}
	}
	return count * value
}

func scoreFullHouse(dice []int) int {
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

func scoreFourOfKind(dice []int) int {
	diceToOccurrences := getOccurrences(dice)
	for d, occurrences := range diceToOccurrences {
		if occurrences >= 4 {
			return d * 4
		}
	}
	return 0
}

func scoreStraight(dice, target []int, score int) int {
	sort.Ints(dice)
	if len(dice) == len(target) {
		for i := range dice {
			if dice[i] != target[i] {
				return 0
			}
		}
		return score
	}
	return 0
}

func scoreYacht(dice []int) int {
	first := dice[0]
	for _, d := range dice {
		if d != first {
			return 0
		}
	}
	return 50
}

func getOccurrences(dice []int) map[int]int {
	diceToOccurrences := make(map[int]int, len(dice))
	for _, d := range dice {
		diceToOccurrences[d]++
	}
	return diceToOccurrences
}

func sum(dice []int) int {
	total := 0
	for _, d := range dice {
		total += d
	}
	return total
}