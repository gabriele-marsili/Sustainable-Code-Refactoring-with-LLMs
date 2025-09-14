package lsproduct

import (
	"errors"
)

func LargestSeriesProduct(digits string, span int) (largestProduct int64, e error) {
	if span < 0 {
		return -1, errors.New("span must not be negative")
	}
	if span > len(digits) {
		return -1, errors.New("span must be larger than digits length")
	}
	if span == 0 {
		return 1, nil
	}
	
	digitBytes := []byte(digits)
	for i := 0; i <= len(digitBytes)-span; i++ {
		product := int64(1)
		for j := i; j < i+span; j++ {
			if digitBytes[j] < '0' || digitBytes[j] > '9' {
				return -1, errors.New("invalid digit")
			}
			digit := int64(digitBytes[j] - '0')
			if digit == 0 {
				product = 0
				break
			}
			product *= digit
		}
		if product > largestProduct {
			largestProduct = product
		}
	}
	return largestProduct, nil
}