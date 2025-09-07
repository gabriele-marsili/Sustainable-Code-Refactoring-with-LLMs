package armstrong

func numDigits(n int) int {
	count := 0
	for n > 0 {
		n /= 10
		count++
	}
	return count
}

func calcArmstrongValue(n, length int) int {
	result := 0
	original := n
	for n > 0 {
		digit := n % 10
		power := 1
		for i := 0; i < length; i++ {
			power *= digit
		}
		result += power
		n /= 10
	}
	return result
}

func IsNumber(n int) bool {
	length := numDigits(n)
	return calcArmstrongValue(n, length) == n
}