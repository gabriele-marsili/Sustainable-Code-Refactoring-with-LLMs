package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}
	
	// Count frequency of each book (1-5)
	counts := [6]int{}
	for _, book := range books {
		if book >= 1 && book <= 5 {
			counts[book]++
		}
	}
	
	totalCost := 0
	
	// Apply discounts greedily, prioritizing larger groups
	for {
		// Count how many different books we have
		uniqueBooks := 0
		for i := 1; i <= 5; i++ {
			if counts[i] > 0 {
				uniqueBooks++
			}
		}
		
		if uniqueBooks == 0 {
			break
		}
		
		// Special case: if we have exactly 3 books of one type and 5 of others,
		// it's better to make two groups of 4 instead of one group of 5 and one of 3
		if uniqueBooks == 5 {
			minCount := counts[1]
			for i := 2; i <= 5; i++ {
				if counts[i] < minCount {
					minCount = counts[i]
				}
			}
			
			// Check if we should prefer 4+4 over 5+3
			remaining := [6]int{}
			copy(remaining[:], counts[:])
			for i := 1; i <= 5; i++ {
				remaining[i] -= minCount
			}
			
			uniqueRemaining := 0
			for i := 1; i <= 5; i++ {
				if remaining[i] > 0 {
					uniqueRemaining++
				}
			}
			
			if uniqueRemaining == 3 {
				// Apply 4-book discount instead
				totalCost += minCount * 4 * 800 * 80 / 100
				for i := 1; i <= 5; i++ {
					counts[i] -= minCount
				}
				continue
			}
		}
		
		// Apply the largest possible discount
		groupSize := uniqueBooks
		if groupSize > 5 {
			groupSize = 5
		}
		
		// Calculate discount
		discount := 100
		switch groupSize {
		case 2:
			discount = 95
		case 3:
			discount = 90
		case 4:
			discount = 80
		case 5:
			discount = 75
		}
		
		totalCost += groupSize * 800 * discount / 100
		
		// Remove one book from each type used
		for i := 1; i <= 5; i++ {
			if counts[i] > 0 {
				counts[i]--
				groupSize--
				if groupSize == 0 {
					break
				}
			}
		}
	}
	
	return totalCost
}