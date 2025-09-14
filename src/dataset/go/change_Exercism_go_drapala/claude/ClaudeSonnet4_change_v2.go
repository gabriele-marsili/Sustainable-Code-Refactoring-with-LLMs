package change

import "errors"

func Change(coins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, errors.New("target can't be negative")
	}
	if target == 0 {
		return []int{}, nil
	}
	
	// dp[i] represents the minimum number of coins needed to make amount i
	dp := make([]int, target+1)
	parent := make([]int, target+1)
	
	// Initialize with impossible value
	for i := 1; i <= target; i++ {
		dp[i] = target + 1
		parent[i] = -1
	}
	
	for i := 1; i <= target; i++ {
		for _, coin := range coins {
			if coin <= i && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				parent[i] = coin
			}
		}
	}
	
	if dp[target] > target {
		return nil, errors.New("can't make target with given coins")
	}
	
	// Reconstruct the solution
	result := make([]int, 0, dp[target])
	amount := target
	for amount > 0 {
		coin := parent[amount]
		result = append(result, coin)
		amount -= coin
	}
	
	return result, nil
}