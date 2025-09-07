package armstrong

func numdigits(n int) int {
	count := 0
	for n > 0 {
		n /= 10
		count++
	}
	return count
}

func calcArmstrongValue(n, length int) int {
	result := 0
	temp := n
	for temp > 0 {
		digit := temp % 10
		power := 1
		for i := 0; i < length; i++ {
			power *= digit
		}
		result += power
		temp /= 10
	}
	return result
}

func IsNumber(n int) bool {
	return calcArmstrongValue(n, numdigits(n)) == n
}