package lsproduct

import (
	"fmt"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	// Error handling
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	}
	if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	}
	if span == 0 {
		return 1, nil
	}

	// Number of possible permutations
	perm := len(digits) - span + 1
	if perm <= 0 {
		return 0, fmt.Errorf("span must be smaller than string length")
	}

	maxProduct := 0
	for i := 0; i < perm; i++ {
		product := 1
		for j := i; j < i+span; j++ {
			digit := digits[j]
			if digit < '0' || digit > '9' {
				return 0, fmt.Errorf("digits input must only contain digits")
			}
			product *= int(digit - '0')
		}
		if maxProduct < product {
			maxProduct = product
		}
	}

	return int64(maxProduct), nil
}