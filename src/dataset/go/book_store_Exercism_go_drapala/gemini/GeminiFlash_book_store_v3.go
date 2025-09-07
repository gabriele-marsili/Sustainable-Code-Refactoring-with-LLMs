package bookstore

func Cost(books []int) int {
	counts := make(map[int]int)
	for _, book := range books {
		counts[book]++
	}

	sets := []int{}
	for {
		setCount := 0
		for i := 0; i < 5; i++ {
			if counts[i] > 0 {
				counts[i]--
				setCount++
			}
		}
		if setCount == 0 {
			break
		}
		sets = append(sets, setCount)
	}

	total := 0
	for _, setCount := range sets {
		switch setCount {
		case 1:
			total += 800
		case 2:
			total += int(float64(2 * 800) * 0.95)
		case 3:
			total += int(float64(3 * 800) * 0.90)
		case 4:
			total += int(float64(4 * 800) * 0.80)
		case 5:
			total += int(float64(5 * 800) * 0.75)
		}
	}

	return total
}