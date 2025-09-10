package summultiples

func SumMultiples(limit int, divisors ...int) int {
	sum := 0
	seen := make(map[int]bool)

	for _, divisor := range divisors {
		if divisor <= 0 {
			continue
		}
		for multiple := divisor; multiple < limit; multiple += divisor {
			if !seen[multiple] {
				sum += multiple
				seen[multiple] = true
			}
		}
	}

	return sum
}