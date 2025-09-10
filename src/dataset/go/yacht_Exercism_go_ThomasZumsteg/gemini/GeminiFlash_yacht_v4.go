package yacht

import (
	"sort"
)

func Score(dice []int, category string) int {
	switch category {
	case "yacht":
		if allSame(dice) {
			return 50
		}
	case "ones":
		return count(dice, 1)
	case "twos":
		return count(dice, 2) * 2
	case "threes":
		return count(dice, 3) * 3
	case "fours":
		return count(dice, 4) * 4
	case "fives":
		return count(dice, 5) * 5
	case "sixes":
		return count(dice, 6) * 6
	case "full house":
		counts := countOccurrences(dice)
		if len(counts) == 2 && ((counts[dice[0]] == 2 && counts[dice[4]] == 3) || (counts[dice[0]] == 3 && counts[dice[4]] == 2)) {
			sum := 0
			for _, die := range dice {
				sum += die
			}
			return sum
		}
	case "four of a kind":
		counts := countOccurrences(dice)
		for die, count := range counts {
			if count >= 4 {
				return die * 4
			}
		}
	case "little straight":
		sort.Ints(dice)
		if isStraight(dice, 1) {
			return 30
		}
	case "big straight":
		sort.Ints(dice)
		if isStraight(dice, 2) {
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

func count(dice []int, target int) int {
	count := 0
	for _, die := range dice {
		if die == target {
			count++
		}
	}
	return count
}

func allSame(dice []int) bool {
	if len(dice) == 0 {
		return true
	}
	first := dice[0]
	for _, die := range dice {
		if die != first {
			return false
		}
	}
	return true
}

func countOccurrences(dice []int) map[int]int {
	counts := make(map[int]int)
	for _, die := range dice {
		counts[die]++
	}
	return counts
}

func isStraight(dice []int, start int) bool {
	for i, die := range dice {
		if die != start+i {
			return false
		}
	}
	return true
}