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

	result := []int{}
	remaining := target

	for _, coin := range coins {
		for remaining >= coin {
			result = append(result, coin)
			remaining -= coin
		}
	}

	if remaining == 0 {
		return result, nil
	}

	return nil, errors.New("cannot make change")
}