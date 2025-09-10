package lsproduct

import (
	"errors"
	"strconv"
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

	for i := 0; i < len(digits); i++ {
		d, err := strconv.Atoi(string(digits[i]))
		if err != nil {
			return -1, errors.New("input contains non-digit characters")
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

		outgoing, _ := strconv.Atoi(string(digits[i-span]))
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