package allyourbase

import "errors"

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
	
	outputDigits = make([]int, 0, 32)
	for base10 > 0 {
		digit := base10 % outputBase
		outputDigits = append(outputDigits, digit)
		base10 = base10 / outputBase
	}
	
	for i, j := 0, len(outputDigits)-1; i < j; i, j = i+1, j-1 {
		outputDigits[i], outputDigits[j] = outputDigits[j], outputDigits[i]
	}
	
	return outputDigits, nil
}

func getBase10Input(inputBase int, inputDigits []int) (base10Input int) {
	power := 1
	for i := len(inputDigits) - 1; i >= 0; i-- {
		base10Input += power * inputDigits[i]
		power *= inputBase
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