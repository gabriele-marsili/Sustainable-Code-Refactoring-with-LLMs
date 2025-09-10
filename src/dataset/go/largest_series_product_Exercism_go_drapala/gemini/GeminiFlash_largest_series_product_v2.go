package lsproduct

import (
	"fmt"
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
	for i := 0; i <= len(digits)-span; i++ {
		product := 1
		for j := 0; j < span; j++ {
			digit := digits[i+j]
			if digit < '0' || digit > '9' {
				return 0, fmt.Errorf("digits input must only contain digits")
			}
			product *= int(digit - '0')
		}
		if product > maxProduct {
			maxProduct = product
		}
	}

	return int64(maxProduct), nil
}