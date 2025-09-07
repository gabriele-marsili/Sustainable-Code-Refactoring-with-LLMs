package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}

	bookCounts := make(map[int]int)
	for _, book := range basket {
		bookCounts[book]++
	}

	return calculateMinCost(bookCounts)
}

func calculateMinCost(bookCounts map[int]int) int {
	discounts := []int{0, 0, 5, 10, 20, 25}
	groupCosts := []int{0, 800, 1600, 2400, 3200, 4000}

	minCost := 0
	for {
		groupSize := 0
		for book, count := range bookCounts {
			if count > 0 {
				groupSize++
				bookCounts[book]--
			}
		}

		if groupSize == 0 {
			break
		}

		minCost += groupCosts[groupSize] * (100 - discounts[groupSize]) / 100
	}

	return minCost
}