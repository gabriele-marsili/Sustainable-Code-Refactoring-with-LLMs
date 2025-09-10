package knapsack

type Item struct {
	Weight, Value int
}

// Knapsack takes in a maximum carrying capacity and a collection of items
// and returns the maximum value that can be carried by the knapsack
// given that the knapsack can only carry a maximum weight given by maximumWeight
func Knapsack(maxWeight int, items []Item) int {
	n := len(items)

	// dp[i] is the maximum value that can be carried with weight i
	dp := make([]int, maxWeight+1)

	for i := 0; i < n; i++ {
		for w := maxWeight; w >= items[i].Weight; w-- {
			dp[w] = max(dp[w], dp[w-items[i].Weight]+items[i].Value)
		}
	}

	return dp[maxWeight]
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}