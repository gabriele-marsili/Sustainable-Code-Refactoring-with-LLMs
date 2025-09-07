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
	if n < 0 {
		n = -n
	}
	
	var powCache [10]int
	base := 1
	for i := 0; i < length; i++ {
		base *= 10
	}
	for i := 0; i < 10; i++ {
		digit := 1
		for j := 0; j < length; j++ {
			digit *= i
		}
		powCache[i] = digit
	}
	
	result := 0
	for n > 0 {
		digit := n % 10
		result += powCache[digit]
		n /= 10
	}
	return result
}

func IsNumber(n int) bool {
	return calcArmstrongValue(n, numdigits(n)) == n
}