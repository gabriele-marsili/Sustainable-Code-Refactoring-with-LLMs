package summultiples

func SumMultiples(limit int, divisors ...int) (sum int) {
	if limit <= 0 {
		return 0
	}
	
	seen := make(map[int]bool)
	
	for _, divisor := range divisors {
		if divisor == 0 {
			continue
		}
		
		for multiple := divisor; multiple < limit; multiple += divisor {
			if !seen[multiple] {
				seen[multiple] = true
				sum += multiple
			}
		}
	}
	
	return sum
}