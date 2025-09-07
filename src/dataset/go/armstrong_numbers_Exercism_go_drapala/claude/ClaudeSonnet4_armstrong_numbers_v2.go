package armstrong

func numdigits(n int) int {
	if n == 0 {
		return 1
	}
	count := 0
	if n < 0 {
		n = -n
	}
	for n > 0 {
		n /= 10
		count++
	}
	return count
}

func calcArmstrongValue(n, length int) int {
	var result int
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
	if n < 0 {
		return false
	}
	return calcArmstrongValue(n, numdigits(n)) == n
}