package bookstore

type bookGrouping [][]int

var discounts = map[int]int{
	2: 5,
	3: 10,
	4: 20,
	5: 25,
}

func Cost(basket []int) int {
	minCost := -1

	var findMinCost func(remaining []int, groupings bookGrouping, currentCost int)
	findMinCost = func(remaining []int, groupings bookGrouping, currentCost int) {
		if len(remaining) == 0 {
			if minCost == -1 || currentCost < minCost {
				minCost = currentCost
			}
			return
		}

		book := remaining[0]
		remaining = remaining[1:]

		// Try adding to existing groups
		for i := range groupings {
			canAdd := true
			for _, existingBook := range groupings[i] {
				if existingBook == book {
					canAdd = false
					break
				}
			}
			if canAdd {
				newGroupings := make(bookGrouping, len(groupings))
				copy(newGroupings, groupings)

				newGroup := make([]int, len(groupings[i]))
				copy(newGroup, groupings[i])
				newGroup = append(newGroup, book)
				newGroupings[i] = newGroup

				discount := 0
				if val, ok := discounts[len(newGroup)]; ok {
					discount = val
				}

				groupCost := len(newGroup) * 800 * (100 - discount) / 100
				findMinCost(remaining, newGroupings, currentCost-groupings.groupCost(i)+newGroupings.groupCost(i)) //subtract old cost, add new cost
			}
		}

		// Try creating a new group
		newGroupings := make(bookGrouping, len(groupings))
		copy(newGroupings, groupings)
		newGroupings = append(newGroupings, []int{book})

		discount := 0
		if val, ok := discounts[1]; ok {
			discount = val
		}
		groupCost := 800 * (100 - discount) / 100

		findMinCost(remaining, newGroupings, currentCost+groupCost)
	}

	findMinCost(basket, New(), 0)
	return minCost
}

func New() bookGrouping {
	return make(bookGrouping, 0)
}

func (books *bookGrouping) groupCost(index int) int {
	discount := 0
	if val, ok := discounts[len((*books)[index])]; ok {
		discount = val
	}
	return len((*books)[index]) * 800 * (100 - discount) / 100
}

func (books *bookGrouping) Cost() (total int) {
	for _, bookGrouping := range *books {
		discount := 0
		if val, ok := discounts[len(bookGrouping)]; ok {
			discount = val
		}
		total += len(bookGrouping) * 800 * (100 - discount) / 100
	}
	return total
}