package bookstore

func Cost(books []int) int {
	if len(books) == 0 {
		return 0
	}
	
	counts := [5]int{}
	for _, book := range books {
		if book >= 1 && book <= 5 {
			counts[book-1]++
		}
	}
	
	total := 0
	for counts[0] > 0 || counts[1] > 0 || counts[2] > 0 || counts[3] > 0 || counts[4] > 0 {
		setSize := 0
		for i := 0; i < 5; i++ {
			if counts[i] > 0 {
				counts[i]--
				setSize++
			}
		}
		
		switch setSize {
		case 1:
			total += 800
		case 2:
			total += 1520
		case 3:
			total += 2160
		case 4:
			total += 2560
		case 5:
			total += 3000
		}
	}
	
	return total
}