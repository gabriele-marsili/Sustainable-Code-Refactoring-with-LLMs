package change

import "errors"

func Change(coins []int, target int) ([]int, error) {
	if target == 0 {
		return []int{}, nil
	}
	
	if target < 0 {
		return nil, errors.New("Could not make change")
	}
	
	dp := make([]int, target+1)
	parent := make([]int, target+1)
	
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
		return nil, errors.New("Could not make change")
	}
	
	result := make([]int, 0, dp[target])
	for target > 0 {
		coin := parent[target]
		result = append(result, coin)
		target -= coin
	}
	
	return result, nil
}