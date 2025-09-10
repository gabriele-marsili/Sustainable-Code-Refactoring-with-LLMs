package change

import (
	"errors"
)

func Change(coins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, errors.New("target cannot be negative")
	}
	dp := make([]int, target+1)
	coinUsed := make([]int, target+1)

	for i := 1; i <= target; i++ {
		dp[i] = target + 1
		coinUsed[i] = -1
	}

	for _, coin := range coins {
		for j := coin; j <= target; j++ {
			if dp[j-coin]+1 < dp[j] {
				dp[j] = dp[j-coin] + 1
				coinUsed[j] = coin
			}
		}
	}

	if dp[target] == target+1 {
		return nil, errors.New("no combination of coins can produce the target")
	}

	result := []int{}
	for target > 0 {
		result = append(result, coinUsed[target])
		target -= coinUsed[target]
	}

	return result, nil
}