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

	largestProduct := int64(0)
	if span == 0 {
		return 1, nil
	}

	nums := make([]int, len(digits))
	for i := 0; i < len(digits); i++ {
		digit := digits[i]
		if digit < '0' || digit > '9' {
			return 0, errors.New("invalid character in digits")
		}
		nums[i] = int(digit - '0')
	}

	for i := 0; i <= len(digits)-span; i++ {
		product := int64(1)
		for j := 0; j < span; j++ {
			product *= int64(nums[i+j])
		}
		if product > largestProduct {
			largestProduct = product
		}
	}

	return largestProduct, nil
}