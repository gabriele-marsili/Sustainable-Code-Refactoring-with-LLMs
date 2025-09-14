package lsproduct

import (
	"fmt"
)

const TestVersion = 2

func LargestSeriesProduct(number string, span int) (int, error) {
	switch {
	case len(number) < span:
		return 0, fmt.Errorf("Span (%d) needs to be smaller than the number (%s)", span, number)
	case span < 0:
		return 0, fmt.Errorf("Span needs to be positive: %d", span)
	}

	if span == 0 {
		return 1, nil
	}

	digits := make([]int, len(number))
	for i, char := range number {
		if char < '0' || char > '9' {
			return 0, fmt.Errorf("%s(%c) does appear to be a valid digit", number[:i], char)
		}
		digits[i] = int(char - '0')
	}

	largest := 0
	product := 1
	
	for i := 0; i < span; i++ {
		product *= digits[i]
	}
	largest = product

	for start := 1; start <= len(digits)-span; start++ {
		if digits[start-1] == 0 {
			product = 1
			for i := 0; i < span; i++ {
				product *= digits[start+i]
			}
		} else {
			product = (product / digits[start-1]) * digits[start+span-1]
		}
		
		if product > largest {
			largest = product
		}
	}

	return largest, nil
}