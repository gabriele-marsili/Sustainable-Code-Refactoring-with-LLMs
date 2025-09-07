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

func intPow(n int, power int) int {
	if power == 0 {
		return 1
	}
	if power == 1 {
		return n
	}
	
	result := 1
	base := n
	
	for power > 0 {
		if power&1 == 1 {
			result *= base
		}
		base *= base
		power >>= 1
	}
	
	return result
}