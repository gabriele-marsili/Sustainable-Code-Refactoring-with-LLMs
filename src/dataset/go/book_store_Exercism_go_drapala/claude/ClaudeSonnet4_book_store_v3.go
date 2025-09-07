package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}
	
	counts := [5]int{}
	for _, book := range books {
		if book >= 1 && book <= 5 {
			counts[book-1]++
		}
	}
	
	totalBooks := 0
	for _, count := range counts {
		totalBooks += count
	}
	
	if totalBooks == 0 {
		return 0
	}
	
	minCost := totalBooks * 800
	
	var findMinCost func([5]int) int
	findMinCost = func(remaining [5]int) int {
		total := 0
		for _, count := range remaining {
			total += count
		}
		
		if total == 0 {
			return 0
		}
		
		cost := total * 800
		
		for groupSize := 5; groupSize >= 2; groupSize-- {
			canForm := true
			for i := 0; i < groupSize; i++ {
				if remaining[i] == 0 {
					canForm = false
					break
				}
			}
			
			if canForm {
				var newRemaining [5]int
				copy(newRemaining[:], remaining[:])
				for i := 0; i < groupSize; i++ {
					newRemaining[i]--
				}
				
				var discount int
				switch groupSize {
				case 2:
					discount = 5
				case 3:
					discount = 10
				case 4:
					discount = 20
				case 5:
					discount = 25
				}
				
				groupCost := groupSize*800*(100-discount)/100 + findMinCost(newRemaining)
				if groupCost < cost {
					cost = groupCost
				}
			}
		}
		
		return cost
	}
	
	return findMinCost(counts)
}