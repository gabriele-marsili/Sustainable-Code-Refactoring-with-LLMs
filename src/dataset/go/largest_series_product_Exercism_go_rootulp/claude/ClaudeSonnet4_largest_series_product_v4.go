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
		product, err := getProduct(digitBytes[i : i+span])
		if err != nil {
			return -1, err
		}
		if product > largestProduct {
			largestProduct = product
		}
	}
	return largestProduct, nil
}

func getProduct(digitBytes []byte) (product int64, e error) {
	product = 1
	for _, b := range digitBytes {
		if b < '0' || b > '9' {
			return -1, errors.New("invalid digit")
		}
		d := int64(b - '0')
		product *= d
	}
	return product, nil
}