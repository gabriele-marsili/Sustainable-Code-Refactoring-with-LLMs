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

	var product int64 = 1
	zeroCount := 0

	for i := 0; i < len(digits); i++ {
		d := digits[i] - '0'
		if d < 0 || d > 9 {
			return -1, errors.New("digits input must only contain numeric characters")
		}

		if i < span {
			if d == 0 {
				zeroCount++
			} else {
				product *= int64(d)
			}
			if i == span-1 && zeroCount == 0 {
				largestProduct = product
			}
			continue
		}

		outgoing := digits[i-span] - '0'
		if outgoing == 0 {
			zeroCount--
		} else {
			product /= int64(outgoing)
		}

		if d == 0 {
			zeroCount++
		} else {
			product *= int64(d)
		}

		if zeroCount == 0 && product > largestProduct {
			largestProduct = product
		}
	}

	return largestProduct, nil
}