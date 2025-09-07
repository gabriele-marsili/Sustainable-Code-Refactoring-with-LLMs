package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}
	
	// Count frequency of each book type
	counts := make([]int, 5)
	for _, book := range books {
		if book >= 1 && book <= 5 {
			counts[book-1]++
		}
	}
	
	// Calculate minimum cost using dynamic programming approach
	return minCost(counts)
}

func minCost(counts []int) int {
	total := 0
	for {
		// Count how many different books we have
		different := 0
		for i := 0; i < 5; i++ {
			if counts[i] > 0 {
				different++
			}
		}
		
		if different == 0 {
			break
		}
		
		// Apply discount based on number of different books
		var discount float64
		switch different {
		case 1:
			discount = 0.0
		case 2:
			discount = 0.05
		case 3:
			discount = 0.10
		case 4:
			discount = 0.20
		case 5:
			discount = 0.25
		}
		
		// Add cost for this set
		cost := int(float64(different*800) * (1.0 - discount))
		total += cost
		
		// Remove one of each different book
		for i := 0; i < 5; i++ {
			if counts[i] > 0 {
				counts[i]--
			}
		}
	}
	
	return total
}