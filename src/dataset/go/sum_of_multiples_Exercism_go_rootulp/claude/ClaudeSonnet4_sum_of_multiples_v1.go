package summultiples

func SumMultiples(limit int, divisors ...int) (sum int) {
	if limit <= 0 || len(divisors) == 0 {
		return 0
	}
	
	seen := make(map[int]bool, limit/2)
	
	for _, divisor := range divisors {
		if divisor <= 0 || divisor >= limit {
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

func getMultiples(limit int, divisors []int) (set map[int]bool) {
	if limit <= 0 || len(divisors) == 0 {
		return map[int]bool{}
	}
	
	set = make(map[int]bool, limit/2)
	
	for _, divisor := range divisors {
		if divisor <= 0 || divisor >= limit {
			continue
		}
		
		for multiple := divisor; multiple < limit; multiple += divisor {
			set[multiple] = true
		}
	}
	
	return set
}

func getMultiplesForDivisor(limit int, divisor int) (multiples []int) {
	if divisor <= 0 || divisor >= limit {
		return multiples
	}
	
	count := (limit - 1) / divisor
	multiples = make([]int, 0, count)
	
	for multiple := divisor; multiple < limit; multiple += divisor {
		multiples = append(multiples, multiple)
	}
	
	return multiples
}