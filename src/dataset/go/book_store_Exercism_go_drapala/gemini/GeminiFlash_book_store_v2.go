package bookstore

import "sort"

func Cost(books []int) int {
	counts := make(map[int]int)
	for _, book := range books {
		counts[book]++
	}

	sets := []int{}
	for _, count := range counts {
		sets = append(sets, count)
	}

	sort.Sort(sort.Reverse(sort.IntSlice(sets)))

	totalCost := 0
	for sets[0] > 0 {
		setSize := 0
		for i := 0; i < len(sets); i++ {
			if sets[i] > 0 {
				setSize++
				sets[i]--
			}
		}

		switch setSize {
		case 1:
			totalCost += 800
		case 2:
			totalCost += 800 * 2 * 95 / 100
		case 3:
			totalCost += 800 * 3 * 90 / 100
		case 4:
			totalCost += 800 * 4 * 80 / 100
		case 5:
			totalCost += 800 * 5 * 75 / 100
		}

		sort.Sort(sort.Reverse(sort.IntSlice(sets)))
	}

	return totalCost
}