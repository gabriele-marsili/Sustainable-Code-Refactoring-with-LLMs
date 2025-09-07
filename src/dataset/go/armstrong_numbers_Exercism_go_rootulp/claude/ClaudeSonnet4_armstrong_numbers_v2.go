package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	temp := n
	digitCount := 0
	
	// Count digits
	for temp > 0 {
		digitCount++
		temp /= 10
	}
	
	temp = n
	// Calculate Armstrong sum
	for temp > 0 {
		digit := temp % 10
		sum += intPow(digit, digitCount)
		temp /= 10
	}
	return sum
}

func intPow(base int, exp int) int {
	if exp == 0 {
		return 1
	}
	result := 1
	for exp > 0 {
		if exp&1 == 1 {
			result *= base
		}
		base *= base
		exp >>= 1
	}
	return result
}