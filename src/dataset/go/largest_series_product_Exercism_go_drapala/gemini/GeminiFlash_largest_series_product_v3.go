package lsproduct

import (
	"fmt"
)

func CheckValidNumber(digits string) bool {
	for i := 0; i < len(digits); i++ {
		if digits[i] < '0' || digits[i] > '9' {
			return false
		}
	}
	return true
}

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	}
	if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	}
	if !CheckValidNumber(digits) {
		return 0, fmt.Errorf("digits input must only contain digits")
	}

	if span == 0 {
		return 1, nil
	}

	maxProduct := 0
	for i := 0; i <= len(digits)-span; i++ {
		product := 1
		for j := i; j < i+span; j++ {
			product *= int(digits[j] - '0')
		}
		if product > maxProduct {
			maxProduct = product
		}
	}

	return int64(maxProduct), nil
}