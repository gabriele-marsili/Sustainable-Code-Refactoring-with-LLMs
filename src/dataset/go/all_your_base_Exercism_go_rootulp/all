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
	base10 := getBase10Input(inputBase, inputDigits)
	if base10 == 0 {
		return []int{0}, nil
	}
	outputDigits = make([]int, 0)
	for base10 > 0 {
		outputDigits = append(outputDigits, base10%outputBase)
		base10 /= outputBase
	}
	reverseInPlace(outputDigits)
	return outputDigits, nil
}

func getBase10Input(inputBase int, inputDigits []int) (base10Input int) {
	multiplier := 1
	for i := len(inputDigits) - 1; i >= 0; i-- {
		base10Input += inputDigits[i] * multiplier
		multiplier *= inputBase
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

func reverseInPlace(input []int) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}