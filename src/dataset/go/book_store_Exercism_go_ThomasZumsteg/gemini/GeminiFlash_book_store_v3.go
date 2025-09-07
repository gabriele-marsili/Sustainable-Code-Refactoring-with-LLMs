package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	// Use a map to count the occurrences of each book.
	bookCounts := make(map[int]int)
	for _, book := range basket {
		bookCounts[book]++
	}

	// Convert the map to a slice of counts.
	counts := make([]int, 0, len(bookCounts))
	for _, count := range bookCounts {
		counts = append(counts, count)
	}

	// Sort the counts in descending order.
	sortDescending(counts)

	totalCost := 0
	for len(counts) > 0 {
		groupSize := 0
		groupCost := 0
		for i := 0; i < len(counts); i++ {
			if counts[i] > 0 && groupSize < 5 {
				counts[i]--
				groupSize++
			}
		}

		discount := 0
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
		groupCost = groupSize * 800 * (100 - discount) / 100
		totalCost += groupCost

		// Remove zero counts
		newCounts := []int{}
		for _, count := range counts {
			if count > 0 {
				newCounts = append(newCounts, count)
			}
		}
		counts = newCounts
		sortDescending(counts)
	}

	return totalCost
}

func sortDescending(arr []int) {
	for i := 0; i < len(arr)-1; i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] < arr[j] {
				arr[i], arr[j] = arr[j], arr[i]
			}
		}
	}
}

func New() bookGrouping {
	return make(bookGrouping, 0)
}

func (books *bookGrouping) Copy() bookGrouping {
	newGroup := make(bookGrouping, len(*books))
	for g, group := range *books {
		newGroup[g] = make([]int, len(group))
		copy(newGroup[g], group)
	}
	return newGroup
}

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	newGroup := books.Copy()
	if len(*books) == location &&
		(location == 0 || 0 < len((*books)[len(*books)-1])) {
		newGroup = append(newGroup, []int{newBook})
	} else if 0 <= location && location < len(*books) {
		for _, book := range newGroup[location] {
			if book == newBook {
				return false, nil
			}
		}
		newGroup[location] = append(newGroup[location], newBook)
	} else {
		return false, nil
	}
	return true, &newGroup
}

func (books *bookGrouping) Cost() (total int) {
	for _, bookGrouping := range *books {
		discount := 0
		switch len(bookGrouping) {
		case 2:
			discount = 5
		case 3:
			discount = 10
		case 4:
			discount = 20
		case 5:
			discount = 25
		}
		total += len(bookGrouping) * 800 * (100 - discount) / 100
	}
	return total
}