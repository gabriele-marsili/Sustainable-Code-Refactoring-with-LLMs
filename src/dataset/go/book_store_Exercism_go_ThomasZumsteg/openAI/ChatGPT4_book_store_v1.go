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

	uniqueBooks := len(bookCounts)
	groupSizes := []int{5, 4, 3, 2, 1}
	minCost := calculateCost(bookCounts, uniqueBooks, groupSizes)

	return minCost
}

func calculateCost(bookCounts map[int]int, uniqueBooks int, groupSizes []int) int {
	if uniqueBooks == 0 {
		return 0
	}

	minCost := int(^uint(0) >> 1) // Max int value
	for _, size := range groupSizes {
		if size > uniqueBooks {
			continue
		}

		tempCounts := make(map[int]int)
		for k, v := range bookCounts {
			tempCounts[k] = v
		}

		for book := range tempCounts {
			if size == 0 {
				break
			}
			tempCounts[book]--
			if tempCounts[book] == 0 {
				delete(tempCounts, book)
			}
			size--
		}

		cost := groupCost(len(bookCounts) - len(tempCounts)) + calculateCost(tempCounts, len(tempCounts), groupSizes)
		if cost < minCost {
			minCost = cost
		}
	}

	return minCost
}

func groupCost(size int) int {
	discounts := map[int]int{
		1: 0,
		2: 5,
		3: 10,
		4: 20,
		5: 25,
	}
	discount := discounts[size]
	return size * 800 * (100 - discount) / 100
}

func New() bookGrouping {
	return make(bookGrouping, 0)
}

func (books *bookGrouping) Copy() bookGrouping {
	newGroup := make(bookGrouping, len(*books))
	for g, group := range *books {
		newGroup[g] = append([]int(nil), group...)
	}
	return newGroup
}

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	newGroup := books.Copy()
	if len(*books) == location &&
		(location == 0 || len((*books)[len(*books)-1]) > 0) {
		newGroup = append(newGroup, []int{newBook})
	} else if location >= 0 && location < len(*books) {
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
		total += groupCost(len(bookGrouping))
	}
	return total
}