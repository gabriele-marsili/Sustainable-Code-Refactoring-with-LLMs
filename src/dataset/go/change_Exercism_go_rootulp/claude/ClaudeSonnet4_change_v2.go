package change

import (
	"fmt"
)

// Change returns the minimum coins from availableCoins that add up to the
// target. It returns an error if target is negative or if not enough coins are
// available to make the target change.
func Change(availableCoins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, fmt.Errorf("target cannot be negative")
	}
	if target == 0 {
		return []int{}, nil
	}

	dp := make([]int, target+1)
	parent := make([]int, target+1)
	
	for i := 1; i <= target; i++ {
		dp[i] = target + 1 // impossible value
		parent[i] = -1
	}

	for i := 1; i <= target; i++ {
		for _, coin := range availableCoins {
			if coin <= i && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				parent[i] = coin
			}
		}
	}

	if dp[target] > target {
		return nil, fmt.Errorf("no change available for target %d", target)
	}

	result := make([]int, 0, dp[target])
	for target > 0 {
		coin := parent[target]
		result = append(result, coin)
		target -= coin
	}

	return result, nil
}