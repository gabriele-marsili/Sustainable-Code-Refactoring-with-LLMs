package summultiples

func SumMultiples(limit int, divisors ...int) (sum int) {
	seen := make(map[int]struct{})
	for _, divisor := range divisors {
		if divisor == 0 {
			continue
		}
		for multiple := divisor; multiple < limit; multiple += divisor {
			if _, exists := seen[multiple]; !exists {
				seen[multiple] = struct{}{}
				sum += multiple
			}
		}
	}
	return sum
}

func getMultiples(limit int, divisors []int) (set map[int]bool) {
	set = make(map[int]bool)
	for _, divisor := range divisors {
		if divisor == 0 {
			continue
		}
		for multiple := divisor; multiple < limit; multiple += divisor {
			set[multiple] = true
		}
	}
	return set
}

func getMultiplesForDivisor(limit int, divisor int) (multiples []int) {
	if divisor == 0 {
		return multiples
	}
	for multiple := divisor; multiple < limit; multiple += divisor {
		multiples = append(multiples, multiple)
	}
	return multiples
}