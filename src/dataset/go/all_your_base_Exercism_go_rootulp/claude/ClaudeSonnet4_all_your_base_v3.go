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
	
	digitCount := 0
	temp := base10
	for temp > 0 {
		temp /= outputBase
		digitCount++
	}
	
	outputDigits = make([]int, digitCount)
	for i := digitCount - 1; i >= 0; i-- {
		outputDigits[i] = base10 % outputBase
		base10 /= outputBase
	}
	return outputDigits, nil
}

func getBase10Input(inputBase int, inputDigits []int) (base10Input int) {
	power := 1
	for i := len(inputDigits) - 1; i >= 0; i-- {
		base10Input += inputDigits[i] * power
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

func reverse(input []int) (reversed []int) {
	reversed = make([]int, len(input))
	for i := 0; i < len(input); i++ {
		reversed[i] = input[len(input)-1-i]
	}
	return reversed
}

func powInt(x, y int) int {
	result := 1
	for y > 0 {
		if y&1 == 1 {
			result *= x
		}
		x *= x
		y >>= 1
	}
	return result
}