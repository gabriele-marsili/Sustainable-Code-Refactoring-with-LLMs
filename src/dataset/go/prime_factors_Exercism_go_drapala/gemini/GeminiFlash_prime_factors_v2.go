package prime

func Factors(n int64) []int64 {
	if n <= 1 {
		return []int64{}
	}

	factors := make([]int64, 0)
	divisor := int64(2)

	for n > 1 && divisor*divisor <= n {
		if n%divisor == 0 {
			factors = append(factors, divisor)
			n /= divisor
		} else {
			divisor++
		}
	}

	if n > 1 {
		factors = append(factors, n)
	}

	return factors
}