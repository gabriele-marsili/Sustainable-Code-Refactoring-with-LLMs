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
	for len(sets) > 0 {
		setCount := 0
		for i := 0; i < len(sets); i++ {
			if sets[i] > 0 {
				setCount++
				sets[i]--
			}
		}

		switch setCount {
		case 0:
			break
		case 1:
			totalCost += 800
		case 2:
			totalCost += int(float64(2*800) * 0.95)
		case 3:
			totalCost += int(float64(3*800) * 0.90)
		case 4:
			totalCost += int(float64(4*800) * 0.80)
		case 5:
			totalCost += int(float64(5*800) * 0.75)
		}

		newSets := []int{}
		for _, count := range sets {
			if count > 0 {
				newSets = append(newSets, count)
			}
		}
		sets = newSets
		sort.Sort(sort.Reverse(sort.IntSlice(sets)))
	}

	return totalCost
}