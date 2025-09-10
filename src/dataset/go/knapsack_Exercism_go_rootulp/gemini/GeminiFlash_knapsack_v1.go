package knapsack

type Item struct {
	Weight, Value int
}

// Knapsack takes in a maximum carrying capacity and a collection of items
// and returns the maximum value that can be carried by the knapsack
// given that the knapsack can only carry a maximum weight given by maximumWeight
func Knapsack(maxWeight int, items []Item) int {
	n := len(items)

	// dp[i][w] stores the maximum value that can be achieved with items up to index i and weight w
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, maxWeight+1)
	}

	// Build the dp table in a bottom-up manner
	for i := 1; i <= n; i++ {
		for w := 0; w <= maxWeight; w++ {
			if items[i-1].Weight <= w {
				// If the current item can be included, choose the maximum between including it and excluding it
				dp[i][w] = max(dp[i-1][w], items[i-1].Value+dp[i-1][w-items[i-1].Weight])
			} else {
				// If the current item cannot be included, take the value from the previous row
				dp[i][w] = dp[i-1][w]
			}
		}
	}

	// The maximum value that can be carried by the knapsack is stored in dp[n][maxWeight]
	return dp[n][maxWeight]
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}