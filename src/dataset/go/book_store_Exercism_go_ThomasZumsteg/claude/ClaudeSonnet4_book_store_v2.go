package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}
	
	minCostList := []bookGrouping{New()}
	minCost := 0
	
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0, len(minCostList)*10)
		currentMinCost := int(^uint(0) >> 1) // max int
		
		for _, grouping := range minCostList {
			groupingLen := len(grouping)
			
			// Try inserting into existing groups
			for location := 0; location < groupingLen; location++ {
				if canInsert(grouping[location], book) {
					newGrouping := insertIntoGroup(grouping, book, location)
					cost := newGrouping.Cost()
					
					if cost < currentMinCost {
						newCostList = newCostList[:0]
						currentMinCost = cost
					}
					if cost == currentMinCost {
						newCostList = append(newCostList, newGrouping)
					}
				}
			}
			
			// Try creating new group
			if groupingLen == 0 || len(grouping[groupingLen-1]) > 0 {
				newGrouping := createNewGroup(grouping, book)
				cost := newGrouping.Cost()
				
				if cost < currentMinCost {
					newCostList = newCostList[:0]
					currentMinCost = cost
				}
				if cost == currentMinCost {
					newCostList = append(newCostList, newGrouping)
				}
			}
		}
		
		minCostList = newCostList
		minCost = currentMinCost
	}
	
	return minCost
}

func New() bookGrouping {
	return make(bookGrouping, 0, 5)
}

func (books *bookGrouping) Copy() bookGrouping {
	if len(*books) == 0 {
		return New()
	}
	
	newGroup := make(bookGrouping, len(*books))
	for i, group := range *books {
		newGroup[i] = make([]int, len(group))
		copy(newGroup[i], group)
	}
	return newGroup
}

func canInsert(group []int, newBook int) bool {
	for _, book := range group {
		if book == newBook {
			return false
		}
	}
	return true
}

func insertIntoGroup(books bookGrouping, newBook, location int) bookGrouping {
	newGroup := books.Copy()
	newGroup[location] = append(newGroup[location], newBook)
	return newGroup
}

func createNewGroup(books bookGrouping, newBook int) bookGrouping {
	newGroup := books.Copy()
	return append(newGroup, []int{newBook})
}

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	if location == len(*books) {
		if location == 0 || len((*books)[len(*books)-1]) > 0 {
			newGroup := createNewGroup(*books, newBook)
			return true, &newGroup
		}
	} else if location >= 0 && location < len(*books) {
		if canInsert((*books)[location], newBook) {
			newGroup := insertIntoGroup(*books, newBook, location)
			return true, &newGroup
		}
	}
	return false, nil
}

func (books *bookGrouping) Cost() int {
	total := 0
	for _, bookGroup := range *books {
		groupSize := len(bookGroup)
		if groupSize == 0 {
			continue
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
		
		total += groupSize * 800 * (100 - discount) / 100
	}
	return total
}