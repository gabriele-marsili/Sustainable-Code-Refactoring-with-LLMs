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

	sumToCoins := make([][]int, target+1)
	sumToCoins[0] = []int{}

	for i := 1; i <= target; i++ {
		for _, coin := range availableCoins {
			if i >= coin && sumToCoins[i-coin] != nil {
				candidate := append([]int{coin}, sumToCoins[i-coin]...)
				if sumToCoins[i] == nil || len(candidate) < len(sumToCoins[i]) {
					sumToCoins[i] = candidate
				}
			}
		}
	}

	if sumToCoins[target] == nil {
		return nil, fmt.Errorf("no change available for target %d", target)
	}
	return sumToCoins[target], nil
}