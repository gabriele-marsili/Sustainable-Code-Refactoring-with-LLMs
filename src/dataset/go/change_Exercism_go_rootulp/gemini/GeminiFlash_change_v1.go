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
		return nil, fmt.Errorf("target cannot be negative: %d", target)
	}

	// Sort coins in descending order for efficiency.  Greedy approach works best with largest coins first.
	sort.Sort(sort.Reverse(sort.IntSlice(availableCoins)))

	coins := []int{}
	remainingTarget := target

	for _, coin := range availableCoins {
		for remainingTarget >= coin {
			coins = append(coins, coin)
			remainingTarget -= coin
		}
	}

	if remainingTarget == 0 {
		return coins, nil
	}

	return nil, fmt.Errorf("no change available for target %d", target)
}

// generateSumToCoins returns a map from sum to the fewest coins that add up
// to that sum. The map spans the range from 0 to target inclusive.
func generateSumToCoins(availableCoins []int, target int) map[int][]int {
	sumToCoins := make(map[int][]int, target+1)
	sumToCoins[0] = []int{}

	for i := 1; i <= target; i++ {
		minCoins := []int(nil) // Initialize to nil slice
		for _, coin := range availableCoins {
			if i-coin >= 0 {
				if prevCoins, ok := sumToCoins[i-coin]; ok {
					newCoins := append([]int{coin}, prevCoins...)
					if minCoins == nil || len(newCoins) < len(minCoins) {
						minCoins = newCoins
					}
				}
			}
		}
		if minCoins != nil {
			sumToCoins[i] = minCoins
		}
	}
	return sumToCoins
}