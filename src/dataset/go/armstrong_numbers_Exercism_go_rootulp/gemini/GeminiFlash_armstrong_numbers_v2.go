package armstrong

import (
	"math"
)

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	numStr := n
	var digits []int
	for numStr > 0 {
		digit := numStr % 10
		digits = append([]int{digit}, digits...)
		numStr /= 10
	}

	power := len(digits)
	for _, digit := range digits {
		sum += intPow(digit, power)
	}
	return sum
}

func intPow(n int, power int) int {
	result := 1
	for i := 0; i < power; i++ {
		result *= n
	}
	return result
}