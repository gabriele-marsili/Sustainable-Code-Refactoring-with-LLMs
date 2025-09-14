package change

import (
	"fmt"
)

// Change returns the minimum coins from availableCoins that add up to the
// target. It returns an error if target is negative or if not enough coins are
// available to make the target change.
func Change(availableCoins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, fmt.Errorf("no change available for target %d", target)
	}
	if target == 0 {
		return []int{}, nil
	}
	
	// Use dynamic programming with minimal memory footprint
	dp := make([]int, target+1)
	parent := make([]int, target+1)
	
	// Initialize with impossible values
	for i := 1; i <= target; i++ {
		dp[i] = target + 1
		parent[i] = -1
	}
	
	// Fill dp table
	for i := 1; i <= target; i++ {
		for _, coin := range availableCoins {
			if coin <= i && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				parent[i] = coin
			}
		}
	}
	
	// Check if solution exists
	if dp[target] > target {
		return nil, fmt.Errorf("no change available for target %d", target)
	}
	
	// Reconstruct solution
	result := make([]int, 0, dp[target])
	for target > 0 {
		coin := parent[target]
		result = append(result, coin)
		target -= coin
	}
	
	return result, nil
}

// generateSumToCoins returns a map from sum to the fewest coins that add up
// to that sum. The map spans the range from 0 to target inclusive.
func generateSumToCoins(availableCoins []int, target int) map[int][]int {
	if target < 0 {
		return make(map[int][]int)
	}
	
	sumToCoins := make(map[int][]int, target+1)
	sumToCoins[0] = []int{}
	
	for i := 1; i <= target; i++ {
		minNumCoins := target + 1
		var bestCoin int
		var bestRemainder []int
		
		for _, coin := range availableCoins {
			if coin <= i {
				if remainingChange, ok := sumToCoins[i-coin]; ok {
					if len(remainingChange) < minNumCoins {
						minNumCoins = len(remainingChange)
						bestCoin = coin
						bestRemainder = remainingChange
					}
				}
			}
		}
		
		if minNumCoins <= target {
			result := make([]int, 0, minNumCoins+1)
			result = append(result, bestCoin)
			result = append(result, bestRemainder...)
			sumToCoins[i] = result
		}
	}
	
	return sumToCoins
}