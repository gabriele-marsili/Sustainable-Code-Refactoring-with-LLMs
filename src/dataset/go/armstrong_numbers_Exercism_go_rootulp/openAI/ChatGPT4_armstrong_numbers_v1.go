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

func countDigits(n int) int {
	count := 0
	for n > 0 {
		n /= 10
		count++
	}
	return count
}

func intPow(n int, power int) int {
	result := 1
	for power > 0 {
		if power%2 == 1 {
			result *= n
		}
		n *= n
		power /= 2
	}
	return result
}