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

func LargestSeriesProduct(digits string, span int) (int64, error) {
	// Error handling
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	} else if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	} else if !CheckValidNumber(digits) {
		return 0, fmt.Errorf("digits input must only contain digits")
	}

	var maxProduct int64 = 0
	var currentProduct int64 = 1
	zeroCount := 0

	for i := 0; i < len(digits); i++ {
		num := int64(digits[i] - '0')

		if num == 0 {
			zeroCount++
		} else {
			currentProduct *= num
		}

		if i >= span {
			leftNum := int64(digits[i-span] - '0')
			if leftNum == 0 {
				zeroCount--
			} else {
				currentProduct /= leftNum
			}
		}

		if zeroCount == 0 && i >= span-1 && currentProduct > maxProduct {
			maxProduct = currentProduct
		}
	}

	return maxProduct, nil
}