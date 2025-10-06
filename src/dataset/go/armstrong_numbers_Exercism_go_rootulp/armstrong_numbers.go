package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	digits := countDigits(n)
	temp := n
	for temp > 0 {
		d := temp % 10
		sum += intPow(d, digits)
		temp /= 10
	}
	return sum
}

func intPow(base, exp int) int {
	result := 1
	for exp > 0 {
		if exp%2 == 1 {
			result *= base
		}
		base *= base
		exp /= 2
	}
	return result
}

func countDigits(n int) int {
	count := 0
	for n > 0 {
		n /= 10
		count++
	}
	return count
}