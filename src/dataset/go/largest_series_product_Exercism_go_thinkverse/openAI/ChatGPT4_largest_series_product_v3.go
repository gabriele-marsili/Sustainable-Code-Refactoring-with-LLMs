package lsproduct

import (
	"errors"
	"unicode"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, errors.New("span must be non-negative")
	}
	if span > len(digits) {
		return 0, errors.New("span must not be greater than the length of the digits")
	}

	var maxProduct int64 = 0
	var currentProduct int64 = 1
	zeroCount := 0

	for i := 0; i < len(digits); i++ {
		if !unicode.IsDigit(rune(digits[i])) {
			return 0, errors.New("digits input must only contain numeric characters")
		}

		num := int64(digits[i] - '0')
		if num == 0 {
			zeroCount++
		} else {
			currentProduct *= num
		}

		if i >= span {
			removedNum := int64(digits[i-span] - '0')
			if removedNum == 0 {
				zeroCount--
			} else {
				currentProduct /= removedNum
			}
		}

		if zeroCount == 0 && i+1 >= span && currentProduct > maxProduct {
			maxProduct = currentProduct
		}
	}

	return maxProduct, nil
}