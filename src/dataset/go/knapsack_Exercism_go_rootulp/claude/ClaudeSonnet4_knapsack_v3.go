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
	
	memo := make(map[string]int)
	return knapsack(items, 0, 0, maxWeight, memo)
}

func knapsack(items []Item, index int, weight int, maxWeight int, memo map[string]int) (total int) {
	if index >= len(items) {
		return 0
	}
	
	key := string(rune(index)) + ":" + string(rune(weight))
	if val, exists := memo[key]; exists {
		return val
	}
	
	item := items[index]
	totalWithoutItem := knapsack(items, index+1, weight, maxWeight, memo)
	
	var totalWithItem int
	if weight+item.Weight <= maxWeight {
		totalWithItem = item.Value + knapsack(items, index+1, weight+item.Weight, maxWeight, memo)
	}
	
	result := max(totalWithItem, totalWithoutItem)
	memo[key] = result
	return result
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}