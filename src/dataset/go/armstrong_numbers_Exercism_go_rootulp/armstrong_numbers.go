package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	temp := n
	digitCount := countDigits(n)
	
	for temp > 0 {
		digit := temp % 10
		sum += intPow(digit, digitCount)
		temp /= 10
	}
	return sum
}

func countDigits(n int) int {
	if n == 0 {
		return 1
	}
	count := 0
	for n > 0 {
		count++
		n /= 10
	}
	return count
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