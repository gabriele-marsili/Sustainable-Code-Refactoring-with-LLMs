package allyourbase

import "errors"

func ConvertToBase(from int, digits []int, to int) ([]int, error) {
	if from < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if to < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	
	// Convert from source base to decimal
	value := 0
	for _, digit := range digits {
		if digit < 0 || from <= digit {
			return nil, errors.New("all digits must satisfy 0 <= d < input base")
		}
		value = value*from + digit
	}
	
	// Handle zero case
	if value == 0 {
		return []int{0}, nil
	}
	
	// Convert from decimal to target base
	// Pre-allocate with estimated capacity to reduce reallocations
	digits = digits[:0] // Reuse input slice if possible
	if cap(digits) == 0 {
		digits = make([]int, 0, 8) // Reasonable initial capacity
	}
	
	for value > 0 {
		digits = append(digits, value%to)
		value /= to
	}
	
	// Reverse in-place
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	
	return digits, nil
}