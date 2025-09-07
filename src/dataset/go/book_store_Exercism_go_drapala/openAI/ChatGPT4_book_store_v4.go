package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}

	discounts := []float64{1.0, 0.95, 0.9, 0.8, 0.75}
	bookCounts := make(map[int]int)
	for _, book := range books {
		bookCounts[book]++
	}

	totalCost := 0
	for {
		uniqueBooks := 0
		for book, count := range bookCounts {
			if count > 0 {
				bookCounts[book]--
				uniqueBooks++
			}
		}
		if uniqueBooks == 0 {
			break
		}
		totalCost += int(float64(uniqueBooks*800) * discounts[uniqueBooks-1])
	}

	return totalCost
}