package lsproduct

import (
	"fmt"
)

// TestVersion is the unit tests that these functions are designed to pass
const TestVersion = 2

/*LargestSeriesProduct finds the largest product of a sequence of digits
of a given length, it also checks the lengths are possible*/
func LargestSeriesProduct(number string, span int) (int, error) {
	switch {
	case len(number) < span:
		return 0, fmt.Errorf("Span (%d) needs to be smaller than the number (%s)", span, number)
	case span < 0:
		return 0, fmt.Errorf("Span needs to be positive: %d", span)
	case span == 0:
		return 1, nil
	}

	largest := 0
	digits := make([]int, len(number))
	for i := 0; i < len(number); i++ {
		digit := number[i] - '0'
		if digit < 0 || digit > 9 {
			return 0, fmt.Errorf("%s(%c) does appear to be a valid digit", number[:i], number[i])
		}
		digits[i] = int(digit)
	}

	for start := 0; start <= len(number)-span; start++ {
		product := 1
		for i := 0; i < span; i++ {
			product *= digits[start+i]
		}
		if product > largest {
			largest = product
		}
	}
	return largest, nil
}