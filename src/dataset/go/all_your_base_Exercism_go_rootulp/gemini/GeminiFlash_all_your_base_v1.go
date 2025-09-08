package allyourbase

import (
	"errors"
)

func ConvertToBase(inputBase int, inputDigits []int, outputBase int) (outputDigits []int, e error) {
	if inputBase < 2 {
		return []int{}, errors.New("input base must be >= 2")
	}
	if outputBase < 2 {
		return []int{}, errors.New("output base must be >= 2")
	}
	for _, digit := range inputDigits {
		if digit < 0 || digit >= inputBase {
			return []int{}, errors.New("all digits must satisfy 0 <= d < input base")
		}
	}

	base10 := convertToBase10(inputBase, inputDigits)

	if base10 == 0 {
		return []int{0}, nil
	}

	outputDigits = []int{}
	for base10 > 0 {
		digit := base10 % outputBase
		outputDigits = append([]int{digit}, outputDigits...)
		base10 /= outputBase
	}

	return outputDigits, nil
}

func convertToBase10(inputBase int, inputDigits []int) int {
	base10 := 0
	for _, digit := range inputDigits {
		base10 = base10*inputBase + digit
	}
	return base10
}