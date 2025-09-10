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

	dp := make([]int, target+1)
	coinsUsed := make([][]int, target+1)

	for i := 1; i <= target; i++ {
		dp[i] = math.MaxInt
		coinsUsed[i] = nil
		for _, coin := range availableCoins {
			if i-coin >= 0 && dp[i-coin] != math.MaxInt && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				newCoins := make([]int, len(coinsUsed[i-coin]))
				copy(newCoins, coinsUsed[i-coin])
				coinsUsed[i] = append([]int{coin}, newCoins...)
			}
		}
	}

	if dp[target] == math.MaxInt {
		return nil, fmt.Errorf("no change available for target %d", target)
	}

	return coinsUsed[target], nil
}