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
		return sumOf(dice, 1)
	case "twos":
		return sumOf(dice, 2)
	case "threes":
		return sumOf(dice, 3)
	case "fours":
		return sumOf(dice, 4)
	case "fives":
		return sumOf(dice, 5)
	case "sixes":
		return sumOf(dice, 6)
	case "full house":
		counts := countValues(dice)
		if len(counts) == 2 && ((counts[1] == 3 && counts[0] == 2) || (counts[0] == 3 && counts[1] == 2)) {
			sum := 0
			valueCounts := make(map[int]int)
			for _, die := range dice {
				valueCounts[die]++
			}
			for val, count := range valueCounts {
				sum += val * count
			}
			return sum
		}
	case "four of a kind":
		counts := countValues(dice)
		sort.Sort(sort.Reverse(sort.IntSlice(counts)))
		if counts[0] >= 4 {
			valueCounts := make(map[int]int)
			for _, die := range dice {
				valueCounts[die]++
			}
			for val, count := range valueCounts {
				if count >= 4 {
					return val * 4
				}
			}
		}
	case "little straight":
		sort.Ints(dice)
		if isLittleStraight(dice) {
			return 30
		}
	case "big straight":
		sort.Ints(dice)
		if isBigStraight(dice) {
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

func sumOf(dice []int, num int) int {
	sum := 0
	for _, die := range dice {
		if die == num {
			sum += num
		}
	}
	return sum
}

func countValues(dice []int) []int {
	counts := make(map[int]int)
	for _, die := range dice {
		counts[die]++
	}
	result := make([]int, 0, len(counts))
	for _, count := range counts {
		result = append(result, count)
	}
	sort.Ints(result)
	return result
}

func isLittleStraight(dice []int) bool {
	for i := 0; i < len(dice); i++ {
		if dice[i] != i+1 {
			return false
		}
	}
	return true
}

func isBigStraight(dice []int) bool {
	for i := 0; i < len(dice); i++ {
		if dice[i] != i+2 {
			return false
		}
	}
	return true
}