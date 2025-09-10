package change

import (
	"errors"
	"sort"
)

func Change(coins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, errors.New("target amount cannot be negative")
	}

	if target == 0 {
		return []int{}, nil
	}

	sort.Sort(sort.Reverse(sort.IntSlice(coins)))

	var result []int
	var solve func(index int, remaining int, current []int) bool

	solve = func(index int, remaining int, current []int) bool {
		if remaining == 0 {
			if len(result) == 0 || len(current) < len(result) {
				result = make([]int, len(current))
				copy(result, current)
				return true
			}
			return false
		}

		if index >= len(coins) || (len(result) > 0 && len(current) >= len(result)) {
			return false
		}

		coin := coins[index]
		if coin <= remaining {
			newCurrent := make([]int, len(current), len(coins))
			copy(newCurrent, current)
			newCurrent = append(newCurrent, coin)
			if solve(index, remaining-coin, newCurrent) {
				return true
			}
		}
		return solve(index+1, remaining, current)
	}

	if solve(0, target, []int{}) {
		return result, nil
	}

	return nil, errors.New("Could not make change")
}