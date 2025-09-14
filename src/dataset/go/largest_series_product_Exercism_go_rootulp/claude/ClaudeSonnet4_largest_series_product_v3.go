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
	for i := 0; i < len(digitBytes); i++ {
		if digitBytes[i] < '0' || digitBytes[i] > '9' {
			return -1, errors.New("invalid digit character")
		}
		digitBytes[i] -= '0'
	}
	
	for i := 0; i <= len(digitBytes)-span; i++ {
		product := int64(1)
		hasZero := false
		
		for j := i; j < i+span; j++ {
			if digitBytes[j] == 0 {
				hasZero = true
				break
			}
			product *= int64(digitBytes[j])
		}
		
		if !hasZero && product > largestProduct {
			largestProduct = product
		}
	}
	
	return largestProduct, nil
}

func getProduct(digits string) (product int64, e error) {
	product = 1
	for i := 0; i < len(digits); i++ {
		if digits[i] < '0' || digits[i] > '9' {
			return -1, errors.New("invalid digit character")
		}
		d := int64(digits[i] - '0')
		product *= d
	}
	return product, nil
}