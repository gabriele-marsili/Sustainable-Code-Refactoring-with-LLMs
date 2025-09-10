package lsproduct

import (
	"fmt"
	"strconv"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	}
	if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	}
	if span == 0 {
		return 1, nil
	}

	maxProduct := 0
	product := 1

	for i := 0; i < len(digits); i++ {
		digit := digits[i]
		if digit < '0' || digit > '9' {
			return 0, fmt.Errorf("digits input must only contain digits")
		}
	}

	for i := 0; i < span; i++ {
		digit := int(digits[i] - '0')
		product *= digit
	}
	maxProduct = product

	for i := span; i < len(digits); i++ {
		product /= int(digits[i-span] - '0')
		digit := int(digits[i] - '0')
		product *= digit
		if product > maxProduct {
			maxProduct = product
		}
	}

	return int64(maxProduct), nil
}