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