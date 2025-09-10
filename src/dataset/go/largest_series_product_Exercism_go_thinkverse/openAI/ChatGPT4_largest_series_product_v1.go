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
	for i := 0; i <= len(digits)-span; i++ {
		var product int64 = 1
		for j := 0; j < span; j++ {
			if !unicode.IsDigit(rune(digits[i+j])) {
				return 0, errors.New("digits input must only contain numeric characters")
			}
			product *= int64(digits[i+j] - '0')
		}
		if product > maxProduct {
			maxProduct = product
		}
	}

	return maxProduct, nil
}