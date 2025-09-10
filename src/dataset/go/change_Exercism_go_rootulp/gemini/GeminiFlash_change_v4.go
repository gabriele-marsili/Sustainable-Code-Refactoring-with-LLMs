package change

import (
	"fmt"
	"math"
	"sort"
)

// Change returns the minimum coins from availableCoins that add up to the
// target. It returns an error if target is negative or if not enough coins are
// available to make the target change.
func Change(availableCoins []int, target int) ([]int, error) {
	if target < 0 {
		return nil, fmt.Errorf("target amount cannot be negative")
	}

	sort.Sort(sort.Reverse(sort.IntSlice(availableCoins)))

	dp := make([][]int, target+1)
	for i := range dp {
		dp[i] = nil
	}
	dp[0] = []int{}

	for i := 1; i <= target; i++ {
		minCoins := []int(nil)
		for _, coin := range availableCoins {
			if i-coin >= 0 && dp[i-coin] != nil {
				coins := append([]int{coin}, dp[i-coin]...)
				if minCoins == nil || len(coins) < len(minCoins) {
					minCoins = coins
				}
			}
		}
		dp[i] = minCoins
	}

	if dp[target] == nil {
		return nil, fmt.Errorf("no change available for target %d", target)
	}

	return dp[target], nil
}