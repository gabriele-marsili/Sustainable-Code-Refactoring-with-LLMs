package knapsack

type Item struct {
	Weight, Value int
}

// Knapsack takes in a maximum carrying capacity and a collection of items
// and returns the maximum value that can be carried by the knapsack
// given that the knapsack can only carry a maximum weight given by maximumWeight
func Knapsack(maxWeight int, items []Item) (total int) {
	if maxWeight <= 0 || len(items) == 0 {
		return 0
	}
	
	dp := make([]int, maxWeight+1)
	
	for _, item := range items {
		for w := maxWeight; w >= item.Weight; w-- {
			if dp[w-item.Weight]+item.Value > dp[w] {
				dp[w] = dp[w-item.Weight] + item.Value
			}
		}
	}
	
	return dp[maxWeight]
}

func knapsack(items []Item, value int, weight int, maxWeight int) (total int) {
	return 0
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}