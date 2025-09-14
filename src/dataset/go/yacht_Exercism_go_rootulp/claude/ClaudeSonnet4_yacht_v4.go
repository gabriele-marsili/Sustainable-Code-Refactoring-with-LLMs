package yacht

import (
	"log"
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
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	for i := 1; i <= 5; i++ {
		if counts[i] != 1 {
			return 0
		}
	}
	if counts[6] != 0 {
		return 0
	}
	return 30
}

func scoreBigStraight(dice []int) (score int) {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	if counts[1] != 0 {
		return 0
	}
	for i := 2; i <= 6; i++ {
		if counts[i] != 1 {
			return 0
		}
	}
	return 30
}

func scoreYacht(dice []int) (score int) {
	if len(dice) == 0 {
		return 0
	}
	
	first := dice[0]
	for i := 1; i < len(dice); i++ {
		if dice[i] != first {
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

func isFullHouse(dice []int) bool {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	hasTwo, hasThree := false, false
	for i := 1; i <= 6; i++ {
		if counts[i] == 2 {
			hasTwo = true
		} else if counts[i] == 3 {
			hasThree = true
		} else if counts[i] != 0 {
			return false
		}
	}
	
	return hasTwo && hasThree
}

func isFourOfKind(dice []int) bool {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	for i := 1; i <= 6; i++ {
		if counts[i] >= 4 {
			return true
		}
	}
	return false
}

func isLittleStraight(dice []int) bool {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	for i := 1; i <= 5; i++ {
		if counts[i] != 1 {
			return false
		}
	}
	return counts[6] == 0
}

func isBigStraight(dice []int) bool {
	counts := [7]int{}
	for _, d := range dice {
		counts[d]++
	}
	
	if counts[1] != 0 {
		return false
	}
	for i := 2; i <= 6; i++ {
		if counts[i] != 1 {
			return false
		}
	}
	return true
}

func isYacht(dice []int) bool {
	if len(dice) == 0 {
		return false
	}
	
	first := dice[0]
	for i := 1; i < len(dice); i++ {
		if dice[i] != first {
			return false
		}
	}
	return true
}

func getOccurences(dice []int) (diceToOccurences map[int]int) {
	diceToOccurences = make(map[int]int, 6)
	for _, d := range dice {
		diceToOccurences[d]++
	}
	return diceToOccurences
}

func sum(dice []int) (result int) {
	for _, d := range dice {
		result += d
	}
	return result
}