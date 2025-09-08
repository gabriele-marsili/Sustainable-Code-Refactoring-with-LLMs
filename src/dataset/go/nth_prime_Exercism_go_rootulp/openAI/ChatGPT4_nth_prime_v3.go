package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	return sieveNthPrime(n), true
}

func sieveNthPrime(n int) int {
	limit := estimateUpperBound(n)
	isComposite := make([]bool, limit+1)
	count := 0

	for i := 2; i <= limit; i++ {
		if !isComposite[i] {
			count++
			if count == n {
				return i
			}
			for j := i * i; j <= limit; j += i {
				isComposite[j] = true
			}
		}
	}
	return 0
}

func estimateUpperBound(n int) int {
	if n < 6 {
		return 15
	}
	return int(float64(n) * (math.Log(float64(n)) + math.Log(math.Log(float64(n)))))
}