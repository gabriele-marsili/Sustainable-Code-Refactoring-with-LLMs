package change

import (
	"errors"
)

func Change(coins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, errors.New("target cannot be negative")
	}
	if len(coins) == 0 {
		return nil, errors.New("no coins provided")
	}

	dp := make([]int, target+1)
	usedCoins := make([]int, target+1)

	for i := 1; i <= target; i++ {
		dp[i] = target + 1
	}

	for _, coin := range coins {
		for j := coin; j <= target; j++ {
			if dp[j-coin]+1 < dp[j] {
				dp[j] = dp[j-coin] + 1
				usedCoins[j] = coin
			}
		}
	}

	if dp[target] == target+1 {
		return nil, errors.New("no solution possible with given coins")
	}

	result := []int{}
	for target > 0 {
		result = append(result, usedCoins[target])
		target -= usedCoins[target]
	}

	return result, nil
}