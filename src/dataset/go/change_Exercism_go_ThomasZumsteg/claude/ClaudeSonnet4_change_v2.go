package change

import "errors"

func Change(coins []int, target int) ([]int, error) {
	if target == 0 {
		return []int{}, nil
	}
	
	// Sort coins in descending order for better pruning
	sortedCoins := make([]int, len(coins))
	copy(sortedCoins, coins)
	for i := 0; i < len(sortedCoins)-1; i++ {
		for j := i + 1; j < len(sortedCoins); j++ {
			if sortedCoins[i] < sortedCoins[j] {
				sortedCoins[i], sortedCoins[j] = sortedCoins[j], sortedCoins[i]
			}
		}
	}
	
	var bestResult []int
	bestLen := target + 1 // Initialize to impossible value
	
	var dfs func(remaining int, coinIdx int, current []int)
	dfs = func(remaining int, coinIdx int, current []int) {
		if remaining == 0 {
			if len(current) < bestLen {
				bestLen = len(current)
				bestResult = make([]int, len(current))
				copy(bestResult, current)
			}
			return
		}
		
		if remaining < 0 || coinIdx >= len(sortedCoins) || len(current) >= bestLen {
			return
		}
		
		coin := sortedCoins[coinIdx]
		maxUse := remaining / coin
		
		// Try using different amounts of current coin
		for use := maxUse; use >= 0; use-- {
			if use > 0 {
				newCurrent := make([]int, len(current), len(current)+use)
				copy(newCurrent, current)
				for i := 0; i < use; i++ {
					newCurrent = append(newCurrent, coin)
				}
				dfs(remaining-coin*use, coinIdx+1, newCurrent)
			} else {
				dfs(remaining, coinIdx+1, current)
			}
		}
	}
	
	dfs(target, 0, []int{})
	
	if bestLen == target+1 {
		return nil, errors.New("Could not make change")
	}
	
	return bestResult, nil
}