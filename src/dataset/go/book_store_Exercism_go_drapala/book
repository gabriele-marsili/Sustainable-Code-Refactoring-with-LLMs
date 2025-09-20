package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}

	discounts := []float64{1.0, 0.95, 0.9, 0.8, 0.75}
	bookPrice := 800
	minCost := make(map[[5]int]int)

	var calculateCost func([5]int) int
	calculateCost = func(counts [5]int) int {
		if cost, exists := minCost[counts]; exists {
			return cost
		}

		total := 0
		for _, count := range counts {
			total += count
		}
		if total == 0 {
			return 0
		}

		min := int(^uint(0) >> 1) // Max int value
		for i := 1; i <= len(discounts); i++ {
			group := [5]int{}
			valid := true
			for j := 0; j < i; j++ {
				if counts[j] == 0 {
					valid = false
					break
				}
				group[j] = counts[j] - 1
			}
			if valid {
				cost := int(float64(i*bookPrice)*discounts[i-1]) + calculateCost(group)
				if cost < min {
					min = cost
				}
			}
		}

		minCost[counts] = min
		return min
	}

	counts := [5]int{}
	for _, book := range books {
		counts[book-1]++
	}

	return calculateCost(counts)
}