package allyourbase

import "errors"

func ConvertToBase(from int, digits []int, to int) ([]int, error) {
	if from < 2 || to < 2 {
		return nil, errors.New("bases must be >= 2")
	}
	value := 0
	for _, digit := range digits {
		if digit < 0 || digit >= from {
			return nil, errors.New("all digits must satisfy 0 <= d < input base")
		}
		value = value*from + digit
	}
	if value == 0 {
		return []int{0}, nil
	}
	result := make([]int, 0, 32)
	for value > 0 {
		result = append(result, value%to)
		value /= to
	}
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}
	return result, nil
}