package bookstore

type bookGrouping [][]int

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}
	
	minCostList := []bookGrouping{New()}
	minCost := 0
	
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0, len(minCostList)*6) // Pre-allocate capacity
		currentMinCost := int(^uint(0) >> 1) // Max int value
		
		for _, grouping := range minCostList {
			maxLocation := len(grouping)
			if maxLocation > 0 && len(grouping[maxLocation-1]) == 0 {
				maxLocation--
			}
			
			for location := 0; location <= maxLocation; location++ {
				if ok, newGrouping := grouping.Insert(book, location); ok {
					cost := newGrouping.Cost()
					if cost < currentMinCost {
						newCostList = newCostList[:0] // Reset slice but keep capacity
						currentMinCost = cost
						newCostList = append(newCostList, *newGrouping)
					} else if cost == currentMinCost {
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
	return make(bookGrouping, 0, 5) // Pre-allocate reasonable capacity
}

func (books *bookGrouping) Copy() bookGrouping {
	if len(*books) == 0 {
		return New()
	}
	
	newGroup := make(bookGrouping, len(*books), cap(*books))
	for i, group := range *books {
		if len(group) > 0 {
			newGroup[i] = make([]int, len(group), cap(group))
			copy(newGroup[i], group)
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
			return true, &newGroup
		}
		return false, nil
	}
	
	// Check for duplicate book in the target group
	targetGroup := newGroup[location]
	for _, book := range targetGroup {
		if book == newBook {
			return false, nil
		}
	}
	
	newGroup[location] = append(newGroup[location], newBook)
	return true, &newGroup
}

func (books *bookGrouping) Cost() int {
	if len(*books) == 0 {
		return 0
	}
	
	total := 0
	for _, bookGroup := range *books {
		groupSize := len(bookGroup)
		if groupSize == 0 {
			continue
		}
		
		var discount int
		switch groupSize {
		case 1:
			discount = 0
		case 2:
			discount = 5
		case 3:
			discount = 10
		case 4:
			discount = 20
		case 5:
			discount = 25
		default:
			discount = 0
		}
		
		total += groupSize * 800 * (100 - discount) / 100
	}
	return total
}