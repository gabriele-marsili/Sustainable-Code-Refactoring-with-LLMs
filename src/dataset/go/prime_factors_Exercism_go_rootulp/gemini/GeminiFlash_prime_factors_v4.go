package prime

func Factors(n int64) (factors []int64) {
	factors = make([]int64, 0, 10)
	current := n
	divisor := int64(2)

	for current > 1 {
		if current%divisor == 0 {
			factors = append(factors, divisor)
			current /= divisor
			for current%divisor == 0 {
				factors = append(factors, divisor)
				current /= divisor
			}
		} else {
			if divisor*divisor > current {
				factors = append(factors, current)
				break
			}
			divisor++
			if divisor > 3 && divisor%2 == 0 {
				divisor++
			}
		}
	}
	return factors
}