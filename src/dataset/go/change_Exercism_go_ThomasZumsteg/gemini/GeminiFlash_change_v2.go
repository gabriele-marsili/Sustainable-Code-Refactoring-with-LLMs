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

	// Sort coins in descending order for efficiency.  Larger coins first.
	sortedCoins := make([]int, len(coins))
	copy(sortedCoins, coins)
	sort.Sort(sort.Reverse(sort.IntSlice(sortedCoins)))

	var bestChange []int

	var findChange func(remaining int, currentChange []int, coinIndex int)

	findChange = func(remaining int, currentChange []int, coinIndex int) {
		if remaining == 0 {
			if bestChange == nil || len(currentChange) < len(bestChange) {
				bestChange = make([]int, len(currentChange))
				copy(bestChange, currentChange)
			}
			return
		}

		if coinIndex >= len(sortedCoins) {
			return
		}

		if bestChange != nil && len(currentChange) >= len(bestChange) {
			return // Prune: current change is already not optimal
		}

		coin := sortedCoins[coinIndex]

		// Try using the current coin as many times as possible
		maxCount := remaining / coin
		for count := maxCount; count >= 0; count-- {
			newRemaining := remaining - count*coin
			newChange := make([]int, len(currentChange))
			copy(newChange, currentChange)
			for i := 0; i < count; i++ {
				newChange = append(newChange, coin)
			}

			if bestChange == nil || len(newChange) < len(bestChange) {
				findChange(newRemaining, newChange, coinIndex+1)
			} else {
				break // Prune: no need to explore further with this coin count
			}
		}
	}

	findChange(target, []int{}, 0)

	if bestChange == nil {
		return nil, errors.New("Could not make change")
	}

	sort.Ints(bestChange) // Ensure the result is sorted

	return bestChange, nil
}