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
	for start := 0; start <= len(digits)-span; start++ {
		product := 1
		hasZero := false
		for i := 0; i < span; i++ {
			digit := digits[start+i]
			if digit == 0 {
				hasZero = true
				break
			}
			product *= digit
		}
		if !hasZero && product > largest {
			largest = product
		}
	}
	return largest, nil
}