package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) int {
	numStr := n
	sum := 0
	digits := 0

	// Calculate the number of digits
	temp := n
	for temp > 0 {
		temp /= 10
		digits++
	}

	// Calculate the Armstrong sum
	for numStr > 0 {
		digit := numStr % 10
		sum += intPow(digit, digits)
		numStr /= 10
	}

	return sum
}

func intPow(base int, exponent int) int {
	result := 1
	for i := 0; i < exponent; i++ {
		result *= base
	}
	return result
}