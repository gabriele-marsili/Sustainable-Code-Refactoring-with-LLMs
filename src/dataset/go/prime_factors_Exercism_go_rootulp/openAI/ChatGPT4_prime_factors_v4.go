package prime

func Factors(n int64) (factors []int64) {
	factors = make([]int64, 0)
	for n%2 == 0 {
		factors = append(factors, 2)
		n /= 2
	}
	for divisor := int64(3); divisor*divisor <= n; divisor += 2 {
		for n%divisor == 0 {
			factors = append(factors, divisor)
			n /= divisor
		}
	}
	if n > 1 {
		factors = append(factors, n)
	}
	return factors
}