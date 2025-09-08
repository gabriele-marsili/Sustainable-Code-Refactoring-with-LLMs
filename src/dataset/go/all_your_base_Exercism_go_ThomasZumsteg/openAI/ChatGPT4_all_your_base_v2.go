package allyourbase

import "errors"

func ConvertToBase(from int, digits []int, to int) ([]int, error) {
	value, err := valueFromBase(from, digits)
	if err != nil {
		return nil, err
	}
	return digitsFromValue(to, value)
}

func valueFromBase(base int, digits []int) (int, error) {
	if base < 2 {
		return 0, errors.New("input base must be >= 2")
	}
	total := 0
	for _, digit := range digits {
		if digit < 0 || digit >= base {
			return 0, errors.New("all digits must satisfy 0 <= d < input base")
		}
		total = total*base + digit
	}
	return total, nil
}

func digitsFromValue(base int, value int) ([]int, error) {
	if base < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	if value == 0 {
		return []int{0}, nil
	}
	digits := make([]int, 0, 32) // Preallocate memory for efficiency
	for value > 0 {
		digits = append(digits, value%base)
		value /= base
	}
	// Reverse the slice in place
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	return digits, nil
}