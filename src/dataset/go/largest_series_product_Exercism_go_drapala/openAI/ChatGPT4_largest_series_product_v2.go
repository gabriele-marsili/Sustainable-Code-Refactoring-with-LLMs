package lsproduct

import (
	"errors"
)

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span > len(digits) {
		return 0, errors.New("span must be smaller than string length")
	} else if span < 0 {
		return 0, errors.New("span must not be negative")
	}

	maxProduct, currentProduct, zeroCount := 0, 1, 0

	for i := 0; i < len(digits); i++ {
		if digits[i] < '0' || digits[i] > '9' {
			return 0, errors.New("digits input must only contain digits")
		}

		num := int(digits[i] - '0')

		if i < span {
			if num == 0 {
				zeroCount++
			} else {
				currentProduct *= num
			}
		} else {
			if zeroCount == 0 {
				currentProduct /= int(digits[i-span] - '0')
			} else if digits[i-span] == '0' {
				zeroCount--
			}

			if num == 0 {
				zeroCount++
			} else {
				currentProduct *= num
			}
		}

		if i >= span-1 && zeroCount == 0 && currentProduct > maxProduct {
			maxProduct = currentProduct
		}
	}

	return int64(maxProduct), nil
}