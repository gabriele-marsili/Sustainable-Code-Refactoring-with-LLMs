package lsproduct

import (
	"errors"
	"strconv"
)

func LargestSeriesProduct(digits string, span int) (largestProduct int64, e error) {
	if span < 0 {
		return -1, errors.New("span must not be negative")
	}
	if span > len(digits) {
		return -1, errors.New("span must be larger than digits length")
	}
	
	var currentProduct int64 = 1
	zeroCount := 0

	for i := 0; i < len(digits); i++ {
		d, err := strconv.Atoi(string(digits[i]))
		if err != nil {
			return -1, errors.New("input contains non-digit characters")
		}

		if d == 0 {
			zeroCount++
		} else {
			currentProduct *= int64(d)
		}

		if i >= span {
			removedDigit, _ := strconv.Atoi(string(digits[i-span]))
			if removedDigit == 0 {
				zeroCount--
			} else {
				currentProduct /= int64(removedDigit)
			}
		}

		if zeroCount == 0 && i >= span-1 && currentProduct > largestProduct {
			largestProduct = currentProduct
		}
	}

	return largestProduct, nil
}