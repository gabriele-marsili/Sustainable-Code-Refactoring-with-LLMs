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

	groupSizes := []int{5, 4, 3, 2, 1}
	minCost := calculateCost(bookCounts, groupSizes)
	return minCost
}

func calculateCost(bookCounts map[int]int, groupSizes []int) int {
	minCost := int(^uint(0) >> 1) // Max int value

	var helper func(map[int]int, int) int
	helper = func(counts map[int]int, currentCost int) int {
		remainingBooks := 0
		for _, count := range counts {
			remainingBooks += count
		}
		if remainingBooks == 0 {
			if currentCost < minCost {
				minCost = currentCost
			}
			return currentCost
		}

		for _, size := range groupSizes {
			if canFormGroup(counts, size) {
				newCounts := make(map[int]int, len(counts))
				for k, v := range counts {
					newCounts[k] = v
				}
				applyGroup(newCounts, size)
				discount := getDiscount(size)
				groupCost := size * 800 * (100 - discount) / 100
				helper(newCounts, currentCost+groupCost)
			}
		}
		return minCost
	}

	return helper(bookCounts, 0)
}

func canFormGroup(counts map[int]int, size int) bool {
	uniqueBooks := 0
	for _, count := range counts {
		if count > 0 {
			uniqueBooks++
		}
		if uniqueBooks >= size {
			return true
		}
	}
	return false
}

func applyGroup(counts map[int]int, size int) {
	booksAdded := 0
	for book := range counts {
		if counts[book] > 0 && booksAdded < size {
			counts[book]--
			booksAdded++
		}
		if booksAdded == size {
			break
		}
	}
}

func getDiscount(groupSize int) int {
	switch groupSize {
	case 2:
		return 5
	case 3:
		return 10
	case 4:
		return 20
	case 5:
		return 25
	default:
		return 0
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