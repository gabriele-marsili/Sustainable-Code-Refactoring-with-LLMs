package summultiples

func SumMultiples(limit int, divisors ...int) int {
	if limit <= 1 {
		return 0
	}
	
	validDivisors := make([]int, 0, len(divisors))
	for _, divisor := range divisors {
		if divisor != 0 {
			validDivisors = append(validDivisors, divisor)
		}
	}
	
	if len(validDivisors) == 0 {
		return 0
	}
	
	seen := make(map[int]bool)
	sum := 0
	
	for n := 1; n < limit; n++ {
		for _, divisor := range validDivisors {
			if n%divisor == 0 {
				if !seen[n] {
					seen[n] = true
					sum += n
				}
				break
			}
		}
	}
	
	return sum
}