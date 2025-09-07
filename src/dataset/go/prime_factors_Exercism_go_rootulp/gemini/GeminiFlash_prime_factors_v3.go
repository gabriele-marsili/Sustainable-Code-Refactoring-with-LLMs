package prime

func Factors(n int64) (factors []int64) {
	factors = make([]int64, 0, 10) // Pre-allocate some space
	current := n

	for divisor := int64(2); divisor*divisor <= current; {
		if current%divisor == 0 {
			factors = append(factors, divisor)
			current /= divisor
		} else {
			divisor++
		}
	}

	if current > 1 {
		factors = append(factors, current)
	}

	return factors
}