package prime

func Factors(n int64) (factors []int64) {
	if n <= 1 {
		return []int64{}
	}
	
	factors = make([]int64, 0, 8) // Pre-allocate with reasonable capacity
	current := n
	
	// Handle factor 2 separately
	for current%2 == 0 {
		factors = append(factors, 2)
		current /= 2
	}
	
	// Check odd divisors only, up to sqrt(current)
	divisor := int64(3)
	for divisor*divisor <= current {
		for current%divisor == 0 {
			factors = append(factors, divisor)
			current /= divisor
		}
		divisor += 2
	}
	
	// If current > 1, then it's a prime factor
	if current > 1 {
		factors = append(factors, current)
	}
	
	return factors
}