package bookstore

type bookGrouping [][]int

var discountTable = [6]int{0, 0, 5, 10, 20, 25}

func Cost(basket []int) int {
	if len(basket) == 0 {
		return 0
	}
	
	minCostList := []bookGrouping{New()}
	minCost := 0
	isSet := false
	
	for _, book := range basket {
		newCostList := make([]bookGrouping, 0, len(minCostList)*10)
		minCost, isSet = 0, false
		
		for _, grouping := range minCostList {
			groupingLen := len(grouping)
			for location := 0; location <= groupingLen; location++ {
				if ok, newGrouping := grouping.Insert(book, location); ok {
					cost := newGrouping.Cost()
					if !isSet || cost < minCost {
						newCostList = newCostList[:0]
						minCost = cost
						isSet = true
					}
					if cost == minCost {
						newCostList = append(newCostList, *newGrouping)
					}
				}
			}
		}
		minCostList = newCostList
	}
	return minCost
}

func New() bookGrouping {
	return make(bookGrouping, 0, 5)
}

func (books *bookGrouping) Copy() bookGrouping {
	booksLen := len(*books)
	newGroup := make(bookGrouping, booksLen, cap(*books))
	for i := 0; i < booksLen; i++ {
		group := (*books)[i]
		groupLen := len(group)
		newGroup[i] = make([]int, groupLen, cap(group))
		copy(newGroup[i], group)
	}
	return newGroup
}

func (books *bookGrouping) Insert(newBook, location int) (bool, *bookGrouping) {
	booksLen := len(*books)
	
	if location == booksLen && (location == 0 || len((*books)[booksLen-1]) > 0) {
		newGroup := books.Copy()
		newGroup = append(newGroup, []int{newBook})
		return true, &newGroup
	}
	
	if location >= 0 && location < booksLen {
		group := (*books)[location]
		for _, book := range group {
			if book == newBook {
				return false, nil
			}
		}
		newGroup := books.Copy()
		newGroup[location] = append(newGroup[location], newBook)
		return true, &newGroup
	}
	
	return false, nil
}

func (books *bookGrouping) Cost() int {
	total := 0
	for _, bookGroup := range *books {
		groupLen := len(bookGroup)
		if groupLen > 0 && groupLen < 6 {
			discount := discountTable[groupLen]
			total += groupLen * 800 * (100 - discount) / 100
		} else if groupLen > 0 {
			total += groupLen * 800
		}
	}
	return total
}