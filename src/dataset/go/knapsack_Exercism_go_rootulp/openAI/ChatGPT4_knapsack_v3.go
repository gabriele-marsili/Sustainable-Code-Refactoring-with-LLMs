package knapsack

type Item struct {
	Weight, Value int
}

func Knapsack(maxWeight int, items []Item) (total int) {
	n := len(items)
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