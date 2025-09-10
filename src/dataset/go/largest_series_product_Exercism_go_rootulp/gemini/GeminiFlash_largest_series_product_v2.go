package lsproduct

import (
	"errors"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, errors.New("span must not be negative")
	}
	if span > len(digits) {
		return 0, errors.New("span must be larger than digits length")
	}

	if span == 0 {
		return 1, nil
	}

	largestProduct := int64(0)
	for i := 0; i <= len(digits)-span; i++ {
		product := int64(1)
		for j := i; j < i+span; j++ {
			digit := digits[j]
			if digit < '0' || digit > '9' {
				return 0, errors.New("invalid character in digits")
			}
			product *= int64(digit - '0')
		}

		if product > largestProduct {
			largestProduct = product
		}
	}

	return largestProduct, nil
}