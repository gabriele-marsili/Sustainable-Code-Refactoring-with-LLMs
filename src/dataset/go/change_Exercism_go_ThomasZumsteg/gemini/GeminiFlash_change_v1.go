package change

import (
	"errors"
	"sort"
)

func Change(coins []int, target int) ([]int, error) {
	if target == 0 {
		return []int{}, nil
	}

	sort.Sort(sort.Reverse(sort.IntSlice(coins)))

	var result []int
	var solve func(index int, remaining int, currentChange []int) bool

	solve = func(index int, remaining int, currentChange []int) bool {
		if remaining == 0 {
			if len(result) == 0 || len(currentChange) < len(result) {
				result = make([]int, len(currentChange))
				copy(result, currentChange)
				return true
			}
			return false
		}

		if index >= len(coins) || (len(result) > 0 && len(currentChange) >= len(result)) {
			return false
		}

		coin := coins[index]
		if coin <= remaining {
			newChange := make([]int, len(currentChange))
			copy(newChange, currentChange)
			newChange = append(newChange, coin)
			if solve(index, remaining-coin, newChange) {
				return true
			}
		}
		return solve(index+1, remaining, currentChange)
	}

	if solve(0, target, []int{}) {
		return result, nil
	}

	return nil, errors.New("Could not make change")
}