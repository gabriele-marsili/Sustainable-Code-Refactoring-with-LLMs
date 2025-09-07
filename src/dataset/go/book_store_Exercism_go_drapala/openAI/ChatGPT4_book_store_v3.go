package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}

	const bookPrice = 800
	discounts := []float64{1.0, 0.95, 0.9, 0.8, 0.75}

	bookCounts := make(map[int]int)
	for _, book := range books {
		bookCounts[book]++
	}

	var calculateCost func(map[int]int) int
	calculateCost = func(counts map[int]int) int {
		// Check if all books are used up
		remainingBooks := 0
		for _, count := range counts {
			remainingBooks += count
		}
		if remainingBooks == 0 {
			return 0
		}

		// Try all possible group sizes
		minCost := int(^uint(0) >> 1) // Max int
		for groupSize := 1; groupSize <= len(discounts); groupSize++ {
			tempCounts := make(map[int]int)
			validGroup := 0
			for book, count := range counts {
				if count > 0 && validGroup < groupSize {
					tempCounts[book] = count - 1
					validGroup++
				} else {
					tempCounts[book] = count
				}
			}
			if validGroup == groupSize {
				cost := int(float64(groupSize*bookPrice)*discounts[groupSize-1]) + calculateCost(tempCounts)
				if cost < minCost {
					minCost = cost
				}
			}
		}
		return minCost
	}

	return calculateCost(bookCounts)
}