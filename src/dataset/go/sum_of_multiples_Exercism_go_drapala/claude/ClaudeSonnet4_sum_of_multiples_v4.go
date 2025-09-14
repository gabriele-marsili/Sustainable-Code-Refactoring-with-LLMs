package summultiples

func SumMultiples(limit int, divisors ...int) int {
	if limit <= 1 {
		return 0
	}
	
	validDivisors := make([]int, 0, len(divisors))
	for _, divisor := range divisors {
		if divisor != 0 && divisor < limit {
			validDivisors = append(validDivisors, divisor)
		}
	}
	
	if len(validDivisors) == 0 {
		return 0
	}
	
	seen := make([]bool, limit)
	sum := 0
	
	for _, divisor := range validDivisors {
		absDivisor := divisor
		if absDivisor < 0 {
			absDivisor = -absDivisor
		}
		
		for multiple := absDivisor; multiple < limit; multiple += absDivisor {
			if !seen[multiple] {
				seen[multiple] = true
				sum += multiple
			}
		}
	}
	
	return sum
}