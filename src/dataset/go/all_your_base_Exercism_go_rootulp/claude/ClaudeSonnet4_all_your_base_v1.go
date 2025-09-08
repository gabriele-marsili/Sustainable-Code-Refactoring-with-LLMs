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
	
	// Pre-allocate slice with estimated capacity
	capacity := estimateDigits(base10, outputBase)
	outputDigits = make([]int, 0, capacity)
	
	for base10 > 0 {
		digit := base10 % outputBase
		outputDigits = append(outputDigits, digit)
		base10 = base10 / outputBase
	}
	
	// Reverse in place
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

func reverse(input []int) (reversed []int) {
	reversed = make([]int, len(input))
	for i := 0; i < len(input); i++ {
		reversed[i] = input[len(input)-1-i]
	}
	return reversed
}

func powInt(x, y int) int {
	if y == 0 {
		return 1
	}
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

func estimateDigits(num, base int) int {
	if num == 0 {
		return 1
	}
	count := 0
	for num > 0 {
		num /= base
		count++
	}
	return count
}