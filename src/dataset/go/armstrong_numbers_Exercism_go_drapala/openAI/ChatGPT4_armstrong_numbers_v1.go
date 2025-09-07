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
	original := n
	for original > 0 {
		digit := original % 10
		original /= 10

		power := 1
		for i := 0; i < length; i++ {
			power *= digit
		}
		result += power
	}
	return result
}

func IsNumber(n int) bool {
	return calcArmstrongValue(n, numdigits(n)) == n
}