package allyourbase

import (
	"fmt"
)

func reverseArray(input []int) []int {
	length := len(input)
	output := make([]int, length)
	for i := 0; i < length; i++ {
		output[i] = input[length-1-i]
	}
	return output
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
	power := 1
	for i := len(array) - 1; i >= 0; i-- {
		output += array[i] * power
		power *= base
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
		return nil, fmt.Errorf("input base must be >= 2")
	}
	if outputBase < 2 {
		return nil, fmt.Errorf("output base must be >= 2")
	}
	if !baseValidChecker(inputDigits, inputBase) {
		return nil, fmt.Errorf("all digits must satisfy 0 <= d < input base")
	}
	
	if len(inputDigits) == 0 {
		return []int{0}, nil
	}
	
	num_base_10 := convertBaseTen(inputDigits, inputBase)
	outputDigits := baseconvArray(num_base_10, outputBase)
	return outputDigits, nil
}