package armstrong

func IsNumber(n int) bool {
	return n == armstrongSum(n)
}

func armstrongSum(n int) (sum int) {
	digits := []int{}
	temp := n
	for temp > 0 {
		digits = append(digits, temp%10)
		temp /= 10
	}
	power := len(digits)
	for _, d := range digits {
		sum += intPow(d, power)
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