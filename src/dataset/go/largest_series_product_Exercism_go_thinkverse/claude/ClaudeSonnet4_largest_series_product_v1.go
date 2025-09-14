package lsproduct

import "errors"

func LargestSeriesProduct(digits string, span int) (int64, error) {
	if span < 0 {
		return 0, errors.New("span cannot be negative")
	}
	
	if span == 0 {
		return 1, nil
	}
	
	if span > len(digits) {
		return 0, errors.New("span cannot be greater than string length")
	}
	
	// Convert string to slice of integers once
	nums := make([]int, len(digits))
	for i, r := range digits {
		if r < '0' || r > '9' {
			return 0, errors.New("invalid character in digits")
		}
		nums[i] = int(r - '0')
	}
	
	var maxProduct int64 = 0
	
	// Use sliding window approach
	for i := 0; i <= len(nums)-span; i++ {
		var product int64 = 1
		hasZero := false
		
		// Calculate product for current window
		for j := i; j < i+span; j++ {
			if nums[j] == 0 {
				hasZero = true
				break
			}
			product *= int64(nums[j])
		}
		
		if !hasZero && product > maxProduct {
			maxProduct = product
		}
	}
	
	return maxProduct, nil
}