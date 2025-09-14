package lsproduct

import (
	"fmt"
)

func CheckValidNumber(digit string) bool {
	for i := 0; i < len(digit); i++ {
		if digit[i] < '0' || digit[i] > '9' {
			return false
		}
	}
	return true
}

func CalculateProduct(subdigit string) int {
	result := 1
	for i := 0; i < len(subdigit); i++ {
		result *= int(subdigit[i] - '0')
	}
	return result
}

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	}
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	}
	if !CheckValidNumber(digits) {
		return 0, fmt.Errorf("digits input must only contain digits")
	}
	
	if span == 0 {
		return 1, nil
	}
	
	maxProduct := 0
	perm := len(digits) - span + 1
	
	for i := 0; i < perm; i++ {
		product := 1
		for j := i; j < i+span; j++ {
			digit := int(digits[j] - '0')
			if digit == 0 {
				product = 0
				break
			}
			product *= digit
		}
		if product > maxProduct {
			maxProduct = product
		}
	}
	
	return int64(maxProduct), nil
}