package allyourbase

import "errors"

func ConvertToBase(from int, digits []int, to int) ([]int, error) {
	if from < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if to < 2 {
		return nil, errors.New("output base must be >= 2")
	}

	value, err := valueFromBase(from, digits)
	if err != nil {
		return nil, err
	}

	if value == 0 {
		return []int{0}, nil
	}

	result := digitsFromValue(to, value)
	return result, nil
}

func valueFromBase(base int, digits []int) (int, error) {
	total := 0
	for _, digit := range digits {
		if digit < 0 || base <= digit {
			return 0, errors.New("all digits must satisfy 0 <= d < input base")
		}
		total = total*base + digit
	}
	return total, nil
}

func digitsFromValue(base int, value int) []int {
	digits := make([]int, 0)
	for value > 0 {
		digits = append(digits, value%base)
		value /= base
	}

	// Reverse the digits slice
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}

	return digits
}