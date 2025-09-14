package lsproduct

import "errors"

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, errors.New("span cannot be negative")
	}
	
	if span == 0 {
		return 1, nil
	}
	
	if len(digits) < span {
		return 0, errors.New("span is larger than string length")
	}
	
	digitValues := make([]int, len(digits))
	for i, r := range digits {
		if r < '0' || r > '9' {
			return 0, errors.New("invalid character in digits")
		}
		digitValues[i] = int(r - '0')
	}
	
	var maxProduct int64
	
	for i := 0; i <= len(digitValues)-span; i++ {
		product := int64(1)
		for j := i; j < i+span; j++ {
			product *= int64(digitValues[j])
		}
		if product > maxProduct {
			maxProduct = product
		}
	}
	
	return maxProduct, nil
}