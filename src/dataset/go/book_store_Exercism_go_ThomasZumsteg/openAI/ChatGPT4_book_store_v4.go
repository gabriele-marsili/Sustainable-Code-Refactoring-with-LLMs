package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}

	groupings := map[string]int{"": 0}
	for _, book := range basket {
		newGroupings := make(map[string]int)
		for key, cost := range groupings {
			for i := 0; i <= len(key); i++ {
				newKey := insertBook(key, book, i)
				if newKey != "" {
					newCost := cost + calculateCost(newKey)
					if existingCost, exists := newGroupings[newKey]; !exists || newCost < existingCost {
						newGroupings[newKey] = newCost
					}
				}
			}
		}
		groupings = newGroupings
	}

	minCost := int(^uint(0) >> 1) // Max int
	for _, cost := range groupings {
		if cost < minCost {
			minCost = cost
		}
	}
	return minCost
}

func insertBook(key string, book, location int) string {
	counts := decodeKey(key)
	if location == len(counts) {
		counts = append(counts, 0)
	}
	if counts[location] == book {
		return ""
	}
	counts[location]++
	return encodeKey(counts)
}

func calculateCost(key string) int {
	counts := decodeKey(key)
	total := 0
	for _, count := range counts {
		discount := 0
		switch count {
		case 2:
			discount = 5
		case 3:
			discount = 10
		case 4:
			discount = 20
		case 5:
			discount = 25
		}
		total += count * 800 * (100 - discount) / 100
	}
	return total
}

func encodeKey(counts []int) string {
	key := make([]byte, len(counts))
	for i, count := range counts {
		key[i] = byte(count)
	}
	return string(key)
}

func decodeKey(key string) []int {
	counts := make([]int, len(key))
	for i, b := range key {
		counts[i] = int(b)
	}
	return counts
}