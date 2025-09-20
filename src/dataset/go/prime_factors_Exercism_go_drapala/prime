package prime

func getDivisors(n int64, divisors *[]int64, testDivisor int64) {
	for testDivisor*testDivisor <= n {
		if n%testDivisor == 0 {
			*divisors = append(*divisors, testDivisor)
			n /= testDivisor
		} else {
			testDivisor++
		}
	}
	if n > 1 {
		*divisors = append(*divisors, n)
	}
}

func Factors(n int64) []int64 {
	divisors := make([]int64, 0)
	getDivisors(n, &divisors, 2)
	return divisors
}