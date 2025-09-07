package prime

func Factors(n int64) []int64 {
	factors := make([]int64, 0, 10) // Pre-allocate some space
	for i := int64(2); i*i <= n; i++ {
		for n%i == 0 {
			factors = append(factors, i)
			n /= i
		}
	}
	if n > 1 {
		factors = append(factors, n)
	}
	return factors
}