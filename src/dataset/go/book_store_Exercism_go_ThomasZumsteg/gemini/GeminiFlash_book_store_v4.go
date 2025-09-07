package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	minCostList := []bookGrouping{New()}
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0)
		minCost := -1
		for _, grouping := range minCostList {
			for location := 0; location <= len(grouping); location++ {
				newGrouping := grouping.Insert(book, location)
				if newGrouping != nil {
					cost := newGrouping.Cost()
					if minCost == -1 || cost < minCost {
						newCostList = []bookGrouping{*newGrouping}
						minCost = cost
					} else if cost == minCost {
						newCostList = append(newCostList, *newGrouping)
					}
				}
			}
		}
		minCostList = newCostList
	}

	if len(minCostList) == 0 {
		return 0
	}

	minCost := minCostList[0].Cost()
	for i := 1; i < len(minCostList); i++ {
		cost := minCostList[i].Cost()
		if cost < minCost {
			minCost = cost
		}
	}
	return minCost
}

func New() bookGrouping {
	return make(bookGrouping, 0)
}

func (books *bookGrouping) Copy() bookGrouping {
	newGroup := make(bookGrouping, len(*books))
	for i, group := range *books {
		newGroup[i] = make([]int, len(group))
		copy(newGroup[i], group)
	}
	return newGroup
}

func (books *bookGrouping) Insert(newBook, location int) *bookGrouping {
	newGroup := books.Copy()
	if len(*books) == location {
		if location == 0 || len((*books)[len(*books)-1]) > 0 {
			newGroup = append(newGroup, []int{newBook})
			return &newGroup
		}
		return nil
	}

	if location >= 0 && location < len(*books) {
		for _, book := range newGroup[location] {
			if book == newBook {
				return nil
			}
		}
		newGroup[location] = append(newGroup[location], newBook)
		return &newGroup
	}

	return nil
}

func (books *bookGrouping) Cost() int {
	total := 0
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