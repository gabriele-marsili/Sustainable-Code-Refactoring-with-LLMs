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
	if invalidDigit(inputBase, inputDigits) {
		return []int{}, errors.New("all digits must satisfy 0 <= d < input base")
	}

	base10 := getBase10Input(inputBase, inputDigits)

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

func getBase10Input(inputBase int, inputDigits []int) (base10Input int) {
	for _, digit := range inputDigits {
		base10Input = base10Input*inputBase + digit
	}
	return base10Input
}

func invalidDigit(inputBase int, input []int) bool {
	for _, digit := range input {
		if digit < 0 || digit >= inputBase {
			return true
		}
	}
	return false
}