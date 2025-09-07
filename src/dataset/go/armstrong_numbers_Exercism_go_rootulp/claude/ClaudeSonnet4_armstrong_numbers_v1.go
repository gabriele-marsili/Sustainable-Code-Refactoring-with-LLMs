package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	if n < 0 {
		return 0
	}
	
	// Count digits and collect them in one pass
	temp := n
	digitCount := 0
	digits := make([]int, 0, 10) // pre-allocate with reasonable capacity
	
	if n == 0 {
		digits = append(digits, 0)
		digitCount = 1
	} else {
		for temp > 0 {
			digits = append(digits, temp%10)
			temp /= 10
			digitCount++
		}
	}
	
	// Calculate sum using integer-only power function
	for _, digit := range digits {
		sum += intPow(digit, digitCount)
	}
	return sum
}

func intPow(base int, exp int) int {
	if exp == 0 {
		return 1
	}
	if exp == 1 {
		return base
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