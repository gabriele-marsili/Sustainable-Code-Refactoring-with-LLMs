package change

import (
	"errors"
	"sort"
)

func Change(coins []int, target int) (result []int, err error) {
	sort.Sort(sort.Reverse(sort.IntSlice(coins))) // Sort coins in descending order for efficiency
	var dfs func(remaining int, index int, currentChange []int)
	minChange := []int{}

	dfs = func(remaining int, index int, currentChange []int) {
		if remaining == 0 {
			if len(minChange) == 0 || len(currentChange) < len(minChange) {
				minChange = append([]int{}, currentChange...)
			}
			return
		}
		if index >= len(coins) || remaining < 0 || (len(minChange) > 0 && len(currentChange) >= len(minChange)) {
			return
		}

		// Include the current coin
		dfs(remaining-coins[index], index, append(currentChange, coins[index]))
		// Skip the current coin
		dfs(remaining, index+1, currentChange)
	}

	dfs(target, 0, []int{})
	if len(minChange) == 0 && target != 0 {
		err = errors.New("Could not make change")
	} else {
		result = minChange
	}
	return
}