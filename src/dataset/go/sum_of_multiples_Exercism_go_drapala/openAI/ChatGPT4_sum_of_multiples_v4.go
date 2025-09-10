package summultiples

func SumMultiples(limit int, divisors ...int) int {
	seen := make(map[int]struct{})
	sum := 0

	for _, divisor := range divisors {
		if divisor == 0 {
			continue
		}
		for n := divisor; n < limit; n += divisor {
			if _, exists := seen[n]; !exists {
				seen[n] = struct{}{}
				sum += n
			}
		}
	}

	return sum
}