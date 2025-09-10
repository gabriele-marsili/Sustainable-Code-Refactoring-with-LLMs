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
		return nil, fmt.Errorf("target cannot be negative")
	}

	// Sort coins in descending order for efficiency.
	sort.Sort(sort.Reverse(sort.IntSlice(availableCoins)))

	// Initialize dp array. dp[i] stores the minimum number of coins needed to make change for amount i.
	dp := make([]int, target+1)
	for i := 1; i <= target; i++ {
		dp[i] = math.MaxInt
	}

	// Initialize a slice to store the coins used for each amount.
	coinsUsed := make([][]int, target+1)

	// Iterate through each coin and update the dp array.
	for _, coin := range availableCoins {
		for i := coin; i <= target; i++ {
			if dp[i-coin] != math.MaxInt && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				coinsUsed[i] = append([]int{coin}, coinsUsed[i-coin]...)
			}
		}
	}

	// If dp[target] is still MaxInt, it means we couldn't find a combination of coins to make the target amount.
	if dp[target] == math.MaxInt {
		return nil, fmt.Errorf("no change available for target %d", target)
	}

	return coinsUsed[target], nil
}