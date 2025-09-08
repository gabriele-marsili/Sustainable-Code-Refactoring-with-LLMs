package allyourbase

import (
	"errors"
)

// Reverses an array in place
func reverseArray(input []int) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}

// Converts an integer in base10 to a given base
func baseconvArray(n, base int) []int {
	if n == 0 {
		return []int{0}
	}
	result := make([]int, 0, 32) // Preallocate with a reasonable size
	for n > 0 {
		result = append(result, n%base)
		n /= base
	}
	reverseArray(result)
	return result
}

// Converts a number from a given base to base10
func convertBaseTen(array []int, base int) int {
	output := 0
	for _, digit := range array {
		output = output*base + digit
	}
	return output
}

// Returns true if 0 <= d < input base is satisfied
func baseValidChecker(array []int, base int) bool {
	for _, digit := range array {
		if digit < 0 || digit >= base {
			return false
		}
	}
	return true
}

func ConvertToBase(inputBase int, inputDigits []int, outputBase int) ([]int, error) {
	// Error handling
	if inputBase < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if outputBase < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	if !baseValidChecker(inputDigits, inputBase) {
		return nil, errors.New("all digits must satisfy 0 <= d < input base")
	}
	// Edge case handling
	if len(inputDigits) == 0 { // Empty list
		return []int{0}, nil
	}
	numBase10 := convertBaseTen(inputDigits, inputBase) // Normalize to base10 first
	outputDigits := baseconvArray(numBase10, outputBase) // Convert from base10 to desired base
	return outputDigits, nil
}