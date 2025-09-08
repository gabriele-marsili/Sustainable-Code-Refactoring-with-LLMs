package allyourbase

import (
	"errors"
)

func ConvertToBase(inputBase int, inputDigits []int, outputBase int) (outputDigits []int, e error) {
	if inputBase < 2 {
		return nil, errors.New("input base must be >= 2")
	}
	if outputBase < 2 {
		return nil, errors.New("output base must be >= 2")
	}
	if invalidDigit(inputBase, inputDigits) {
		return nil, errors.New("all digits must satisfy 0 <= d < input base")
	}
	base10 := 0
	for _, digit := range inputDigits {
		base10 = base10*inputBase + digit
	}
	if base10 == 0 {
		return []int{0}, nil
	}
	outputDigits = make([]int, 0, 32)
	for base10 > 0 {
		outputDigits = append(outputDigits, base10%outputBase)
		base10 /= outputBase
	}
	for i, j := 0, len(outputDigits)-1; i < j; i, j = i+1, j-1 {
		outputDigits[i], outputDigits[j] = outputDigits[j], outputDigits[i]
	}
	return outputDigits, nil
}

func invalidDigit(inputBase int, input []int) bool {
	for _, digit := range input {
		if digit < 0 || digit >= inputBase {
			return true
		}
	}
	return false
}