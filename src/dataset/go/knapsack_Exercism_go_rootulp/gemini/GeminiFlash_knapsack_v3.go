package knapsack

type Item struct {
	Weight, Value int
}

// Knapsack takes in a maximum carrying capacity and a collection of items
// and returns the maximum value that can be carried by the knapsack
// given that the knapsack can only carry a maximum weight given by maximumWeight
func Knapsack(maxWeight int, items []Item) int {
	n := len(items)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, maxWeight+1)
	}

	for i := 1; i <= n; i++ {
		for w := 0; w <= maxWeight; w++ {
			if items[i-1].Weight <= w {
				dp[i][w] = max(items[i-1].Value+dp[i-1][w-items[i-1].Weight], dp[i-1][w])
			} else {
				dp[i][w] = dp[i-1][w]
			}
		}
	}

	return dp[n][maxWeight]
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}