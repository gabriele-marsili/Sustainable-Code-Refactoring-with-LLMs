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

	var largestProduct int64 = 0
	for i := 0; i <= len(digits)-span; i++ {
		product, err := getProduct(digits, i, span)
		if err != nil {
			return 0, err
		}
		if product > largestProduct {
			largestProduct = product
		}
	}
	return largestProduct, nil
}

func getProduct(digits string, start int, span int) (int64, error) {
	var product int64 = 1
	for i := start; i < start+span; i++ {
		digit := digits[i]
		if digit < '0' || digit > '9' {
			return 0, errors.New("invalid character in digits")
		}
		product *= int64(digit - '0')
	}
	return product, nil
}