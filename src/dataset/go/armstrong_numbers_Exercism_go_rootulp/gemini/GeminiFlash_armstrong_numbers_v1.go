package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) int {
	sum := 0
	num := n
	digits := 0

	// Calculate the number of digits
	for num > 0 {
		num /= 10
		digits++
	}

	num = n // Reset num to the original value

	for num > 0 {
		digit := num % 10
		sum += intPow(digit, digits)
		num /= 10
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