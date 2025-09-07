package bookstore

import "sort"

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}

	sort.Ints(books)

	counts := make(map[int]int)
	for _, book := range books {
		counts[book]++
	}

	sets := []int{}
	for _, count := range counts {
		sets = append(sets, count)
	}

	sort.Sort(sort.Reverse(sort.IntSlice(sets)))

	numSets := sets[0]
	setSizes := make([]int, numSets)
	for i := 0; i < numSets; i++ {
		setSizes[i] = 0
	}

	bookIndex := 0
	for i := 0; i < len(sets); i++ {
		for j := 0; j < sets[i]; j++ {
			setSizes[j]++
			bookIndex++
		}
	}

	totalCost := 0
	for _, size := range setSizes {
		switch size {
		case 0:
			continue
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
	}

	return totalCost
}