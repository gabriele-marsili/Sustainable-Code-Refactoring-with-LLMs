package lsproduct

import (
	"errors"
	"strconv"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, errors.New("span must be non-negative")
	}
	if span > len(digits) {
		return 0, errors.New("span must be smaller than or equal to the length of the string")
	}

	if span == 0 {
		return 1, nil
	}

	var largestProduct int64 = 0
	for i := 0; i <= len(digits)-span; i++ {
		product := int64(1)
		for j := 0; j < span; j++ {
			digit, err := strconv.Atoi(string(digits[i+j]))
			if err != nil {
				return 0, errors.New("invalid input")
			}
			product *= int64(digit)
		}
		if product > largestProduct {
			largestProduct = product
		}
	}

	return largestProduct, nil
}