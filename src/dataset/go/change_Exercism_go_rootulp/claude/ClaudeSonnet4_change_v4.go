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
	
	dp := make([]int, target+1)
	parent := make([]int, target+1)
	
	for i := 1; i <= target; i++ {
		dp[i] = -1
		parent[i] = -1
	}
	
	for i := 1; i <= target; i++ {
		for _, coin := range availableCoins {
			if coin <= i && dp[i-coin] != -1 {
				newCount := dp[i-coin] + 1
				if dp[i] == -1 || newCount < dp[i] {
					dp[i] = newCount
					parent[i] = coin
				}
			}
		}
	}
	
	if dp[target] == -1 {
		return nil, fmt.Errorf("no change available for target %d", target)
	}
	
	result := make([]int, 0, dp[target])
	current := target
	for current > 0 {
		coin := parent[current]
		result = append(result, coin)
		current -= coin
	}
	
	return result, nil
}

// generateSumToCoins returns a map from sum to the fewest coins that add up
// to that sum. The map spans the range from 0 to target inclusive.
func generateSumToCoins(availableCoins []int, target int) map[int][]int {
	sumToCoins := make(map[int][]int, target+1)
	sumToCoins[0] = []int{}
	
	for i := 1; i <= target; i++ {
		minNumCoins := int(^uint(0) >> 1)
		var bestCoin int
		var bestRemainder []int
		
		for _, coin := range availableCoins {
			if coin <= i {
				if remainingChange, ok := sumToCoins[i-coin]; ok && len(remainingChange) < minNumCoins {
					minNumCoins = len(remainingChange)
					bestCoin = coin
					bestRemainder = remainingChange
				}
			}
		}
		
		if minNumCoins != int(^uint(0) >> 1) {
			result := make([]int, 0, minNumCoins+1)
			result = append(result, bestCoin)
			result = append(result, bestRemainder...)
			sumToCoins[i] = result
		}
	}
	
	return sumToCoins
}