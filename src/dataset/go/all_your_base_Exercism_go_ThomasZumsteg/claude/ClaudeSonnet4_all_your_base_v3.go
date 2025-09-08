package allyourbase

import "errors"

func ConvertToBase(from int, digits []int, to int) ([]int, error) {
	if from < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if to < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	
	value := 0
	for _, digit := range digits {
		if digit < 0 || from <= digit {
			return nil, errors.New("all digits must satisfy 0 <= d < input base")
		}
		value = value*from + digit
	}
	
	if value == 0 {
		return []int{0}, nil
	}
	
	digitCount := 0
	temp := value
	for temp > 0 {
		temp /= to
		digitCount++
	}
	
	result := make([]int, digitCount)
	for i := digitCount - 1; i >= 0; i-- {
		result[i] = value % to
		value /= to
	}
	
	return result, nil
}

func valueFromBase(base int, digits []int) (int, error) {
	if base < 2 {
		return 0, errors.New("input base must be >= 2")
	}
	total := 0
	for _, digit := range digits {
		if digit < 0 || base <= digit {
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
	
	digitCount := 0
	temp := value
	for temp > 0 {
		temp /= base
		digitCount++
	}
	
	digits := make([]int, digitCount)
	for i := digitCount - 1; i >= 0; i-- {
		digits[i] = value % base
		value /= base
	}
	return digits, nil
}