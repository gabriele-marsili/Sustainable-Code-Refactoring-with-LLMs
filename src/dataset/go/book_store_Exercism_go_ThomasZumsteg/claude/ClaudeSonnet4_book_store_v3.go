package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}
	
	minCostList := []bookGrouping{New()}
	minCost := 0
	
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0, len(minCostList)*6)
		currentMinCost := -1
		
		for _, grouping := range minCostList {
			for location := 0; location <= len(grouping); location++ {
				if ok, newGrouping := grouping.Insert(book, location); ok {
					cost := newGrouping.Cost()
					if currentMinCost == -1 || cost < currentMinCost {
						newCostList = newCostList[:0]
						currentMinCost = cost
					}
					if cost == currentMinCost {
						newCostList = append(newCostList, *newGrouping)
					}
				}
			}
		}
		minCostList = newCostList
		minCost = currentMinCost
	}
	return minCost
}

func New() bookGrouping {
	return make(bookGrouping, 0)
}

func (books *bookGrouping) Copy() bookGrouping {
	if len(*books) == 0 {
		return make(bookGrouping, 0)
	}
	
	newGroup := make(bookGrouping, len(*books))
	for g, group := range *books {
		if len(group) > 0 {
			newGroup[g] = make([]int, len(group))
			copy(newGroup[g], group)
		}
	}
	return newGroup
}

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	if location < 0 || location > len(*books) {
		return false, nil
	}
	
	newGroup := books.Copy()
	
	if location == len(*books) {
		if location == 0 || len((*books)[len(*books)-1]) > 0 {
			newGroup = append(newGroup, []int{newBook})
		} else {
			return false, nil
		}
	} else {
		for _, book := range newGroup[location] {
			if book == newBook {
				return false, nil
			}
		}
		newGroup[location] = append(newGroup[location], newBook)
	}
	return true, &newGroup
}

func (books *bookGrouping) Cost() (total int) {
	discounts := [6]int{0, 0, 5, 10, 20, 25}
	
	for _, bookGroup := range *books {
		groupSize := len(bookGroup)
		if groupSize > 0 && groupSize <= 5 {
			total += groupSize * 800 * (100 - discounts[groupSize]) / 100
		} else if groupSize > 5 {
			total += groupSize * 800 * 75 / 100
		}
	}
	return total
}