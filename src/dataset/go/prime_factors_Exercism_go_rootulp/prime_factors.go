package prime

func Factors(n int64) (factors []int64) {
	if n <= 1 {
		return []int64{}
	}
	
	factors = make([]int64, 0, 8)
	current := n
	
	for current&1 == 0 {
		factors = append(factors, 2)
		current >>= 1
	}
	
	divisor := int64(3)
	for divisor*divisor <= current {
		for current%divisor == 0 {
			factors = append(factors, divisor)
			current /= divisor
		}
		divisor += 2
	}
	
	if current > 1 {
		factors = append(factors, current)
	}
	
	return factors
}