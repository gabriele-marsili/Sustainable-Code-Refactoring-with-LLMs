package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}

	discounts := []float64{1.0, 0.95, 0.9, 0.8, 0.75}
	bookPrice := 800
	bookCounts := make(map[int]int)

	for _, book := range books {
		bookCounts[book]++
	}

	totalCost := 0
	for {
		distinctBooks := 0
		for book, count := range bookCounts {
			if count > 0 {
				distinctBooks++
				bookCounts[book]--
			}
		}
		if distinctBooks == 0 {
			break
		}
		totalCost += int(float64(distinctBooks*bookPrice) * discounts[distinctBooks-1])
	}

	return totalCost
}