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
	sumToCoins := generateSumToCoins(availableCoins, target)
	if sumToCoins[target] == nil {
		return nil, fmt.Errorf("no change available for target %d", target)
	}
	return sumToCoins[target], nil
}

// generateSumToCoins returns a map from sum to the fewest coins that add up
// to that sum. The map spans the range from 0 to target inclusive.
func generateSumToCoins(availableCoins []int, target int) map[int][]int {
	sumToCoins := make(map[int][]int, target+1)
	sumToCoins[0] = []int{}

	for i := 1; i <= target; i++ {
		minNumCoins := -1
		for _, coin := range availableCoins {
			if i-coin >= 0 && sumToCoins[i-coin] != nil {
				if minNumCoins == -1 || len(sumToCoins[i-coin])+1 < minNumCoins {
					minNumCoins = len(sumToCoins[i-coin]) + 1
					coins := make([]int, len(sumToCoins[i-coin])+1)
					copy(coins[1:], sumToCoins[i-coin])
					coins[0] = coin
					sumToCoins[i] = coins
				}
			}
		}
	}

	return sumToCoins
}