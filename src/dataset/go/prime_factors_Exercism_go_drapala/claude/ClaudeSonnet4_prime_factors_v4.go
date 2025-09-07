package prime

func getDivisors(n int64, divisors *[]int64, testDivisor int64) {
	for n > 1 {
		if n%testDivisor == 0 {
			*divisors = append(*divisors, testDivisor)
			n /= testDivisor
		} else {
			if testDivisor == 2 {
				testDivisor = 3
			} else {
				testDivisor += 2
			}
			if testDivisor*testDivisor > n {
				if n > 1 {
					*divisors = append(*divisors, n)
				}
				break
			}
		}
	}
}

func Factors(n int64) []int64 {
	if n <= 1 {
		return []int64{}
	}
	
	divisors := make([]int64, 0, 8)
	getDivisors(n, &divisors, 2)
	return divisors
}