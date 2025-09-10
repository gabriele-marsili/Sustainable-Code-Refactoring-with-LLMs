package change

import (
	"errors"
	"sort"
)

func Change(coins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, errors.New("target cannot be negative")
	}

	if target == 0 {
		return []int{}, nil
	}

	sort.Sort(sort.Reverse(sort.IntSlice(coins)))

	var result []int
	var backtrack func(remaining int, index int, currentChange []int) bool

	backtrack = func(remaining int, index int, currentChange []int) bool {
		if remaining == 0 {
			if len(result) == 0 || len(currentChange) < len(result) {
				result = make([]int, len(currentChange))
				copy(result, currentChange)
			}
			return true
		}

		if index >= len(coins) || (len(result) > 0 && len(currentChange) >= len(result)) {
			return false
		}

		coin := coins[index]

		if coin <= remaining {
			newChange := make([]int, len(currentChange))
			copy(newChange, currentChange)
			newChange = append(newChange, coin)
			if backtrack(remaining-coin, index, newChange) {
				return true
			}
		}
		return backtrack(remaining, index+1, currentChange)
	}

	if !backtrack(target, 0, []int{}) {
		return nil, errors.New("Could not make change")
	}

	return result, nil
}