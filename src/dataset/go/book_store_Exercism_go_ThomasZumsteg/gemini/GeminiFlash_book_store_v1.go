package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	minCostList := []bookGrouping{New()}
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0)
		minCost := -1 // Initialize with -1 to indicate no cost is set yet

		for _, grouping := range minCostList {
			for location := 0; location <= len(grouping); location++ {
				ok, newGrouping := grouping.Insert(book, location)
				if ok {
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
		if len(minCostList) == 0 {
			return 0 // Handle empty minCostList to avoid infinite loop
		}
	}
	if len(minCostList) > 0 {
		return minCostList[0].Cost()
	}
	return 0
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

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	newGroup := books.Copy()
	if len(*books) == location {
		if location == 0 || len((*books)[len(*books)-1]) > 0 {
			newGroup = append(newGroup, []int{newBook})
			return true, &newGroup
		}
		return false, nil
	}

	if location >= 0 && location < len(*books) {
		for _, book := range newGroup[location] {
			if book == newBook {
				return false, nil
			}
		}
		newGroup[location] = append(newGroup[location], newBook)
		return true, &newGroup
	}

	return false, nil
}

var discounts = map[int]int{
	2: 5,
	3: 10,
	4: 20,
	5: 25,
}

func (books *bookGrouping) Cost() (total int) {
	for _, bookGrouping := range *books {
		discount := discounts[len(bookGrouping)]
		total += len(bookGrouping) * 800 * (100 - discount) / 100
	}
	return total
}