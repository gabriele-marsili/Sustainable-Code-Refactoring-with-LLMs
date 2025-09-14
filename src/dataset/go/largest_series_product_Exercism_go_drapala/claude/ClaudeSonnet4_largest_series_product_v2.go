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
	
	if span == 0 {
		return 1, nil
	}
	
	var maxProduct int64 = 0
	
	// Calculate initial product for first window
	var currentProduct int64 = 1
	for i := 0; i < span; i++ {
		currentProduct *= int64(digits[i] - '0')
	}
	maxProduct = currentProduct
	
	// Sliding window approach
	for i := span; i < len(digits); i++ {
		// Remove leftmost digit from product
		leftDigit := int64(digits[i-span] - '0')
		if leftDigit == 0 {
			// Recalculate product for current window
			currentProduct = 1
			for j := i - span + 1; j <= i; j++ {
				currentProduct *= int64(digits[j] - '0')
			}
		} else {
			currentProduct = currentProduct / leftDigit * int64(digits[i] - '0')
		}
		
		if currentProduct > maxProduct {
			maxProduct = currentProduct
		}
	}
	
	return maxProduct, nil
}