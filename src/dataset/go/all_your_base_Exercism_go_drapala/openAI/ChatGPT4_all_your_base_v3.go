package allyourbase

import (
	"errors"
)

func reverseArray(input []int) []int {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}

func baseconvArray(n, base int) []int {
	if n == 0 {
		return []int{0}
	}
	result := make([]int, 0, 32)
	for n > 0 {
		result = append(result, n%base)
		n /= base
	}
	return reverseArray(result)
}

func convertBaseTen(array []int, base int) int {
	output := 0
	for _, digit := range array {
		output = output*base + digit
	}
	return output
}

func baseValidChecker(array []int, base int) bool {
	for _, digit := range array {
		if digit < 0 || digit >= base {
			return false
		}
	}
	return true
}

func ConvertToBase(inputBase int, inputDigits []int, outputBase int) ([]int, error) {
	if inputBase < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if outputBase < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	if !baseValidChecker(inputDigits, inputBase) {
		return nil, errors.New("all digits must satisfy 0 <= d < input base")
	}
	if len(inputDigits) == 0 {
		return []int{0}, nil
	}
	numBase10 := convertBaseTen(inputDigits, inputBase)
	return baseconvArray(numBase10, outputBase), nil
}