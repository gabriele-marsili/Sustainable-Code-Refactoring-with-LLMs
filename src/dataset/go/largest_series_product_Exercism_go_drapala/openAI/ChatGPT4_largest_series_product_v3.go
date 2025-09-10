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
	if span > len(digits) {
		return 0, fmt.Errorf("span must be smaller than string length")
	} else if span < 0 {
		return 0, fmt.Errorf("span must not be negative")
	} else if !CheckValidNumber(digits) {
		return 0, fmt.Errorf("digits input must only contain digits")
	}

	maxProduct, currentProduct, zeroCount := 0, 1, 0
	for i := 0; i < len(digits); i++ {
		digit := int(digits[i] - '0')
		if digit == 0 {
			zeroCount++
		} else {
			currentProduct *= digit
		}

		if i >= span {
			removedDigit := int(digits[i-span] - '0')
			if removedDigit == 0 {
				zeroCount--
			} else {
				currentProduct /= removedDigit
			}
		}

		if zeroCount == 0 && i >= span-1 && currentProduct > maxProduct {
			maxProduct = currentProduct
		}
	}

	return int64(maxProduct), nil
}