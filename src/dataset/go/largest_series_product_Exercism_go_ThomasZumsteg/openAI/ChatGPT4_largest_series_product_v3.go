package lsproduct

import (
	"fmt"
	"strconv"
)

const TestVersion = 2

func LargestSeriesProduct(number string, span int) (int, error) {
	if span < 0 {
		return 0, fmt.Errorf("Span needs to be positive: %d", span)
	}
	if len(number) < span {
		return 0, fmt.Errorf("Span (%d) needs to be smaller than the number (%s)", span, number)
	}

	largest, currentProduct := 0, 1
	zeroCount := 0

	for i := 0; i < len(number); i++ {
		digit, err := strconv.Atoi(string(number[i]))
		if err != nil {
			return 0, fmt.Errorf("%s(%c) does appear to be a valid digit", number[:i], number[i])
		}

		if digit == 0 {
			zeroCount++
		} else {
			currentProduct *= digit
		}

		if i >= span {
			removedDigit, _ := strconv.Atoi(string(number[i-span]))
			if removedDigit == 0 {
				zeroCount--
			} else {
				currentProduct /= removedDigit
			}
		}

		if zeroCount == 0 && i >= span-1 && currentProduct > largest {
			largest = currentProduct
		}
	}

	return largest, nil
}