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
	
	var product int64 = 1
	zeroCount := 0

	// Precompute the product for the first span
	for i := 0; i < span; i++ {
		d := digits[i] - '0'
		if d < 0 || d > 9 {
			return -1, errors.New("digits input must only contain numeric characters")
		}
		if d == 0 {
			zeroCount++
		} else {
			product *= int64(d)
		}
	}

	if zeroCount == 0 && product > largestProduct {
		largestProduct = product
	}

	// Slide through the rest of the digits
	for i := span; i < len(digits); i++ {
		outgoing := digits[i-span] - '0'
		incoming := digits[i] - '0'

		if incoming < 0 || incoming > 9 {
			return -1, errors.New("digits input must only contain numeric characters")
		}

		if outgoing == 0 {
			zeroCount--
		} else {
			product /= int64(outgoing)
		}

		if incoming == 0 {
			zeroCount++
		} else {
			product *= int64(incoming)
		}

		if zeroCount == 0 && product > largestProduct {
			largestProduct = product
		}
	}

	return largestProduct, nil
}