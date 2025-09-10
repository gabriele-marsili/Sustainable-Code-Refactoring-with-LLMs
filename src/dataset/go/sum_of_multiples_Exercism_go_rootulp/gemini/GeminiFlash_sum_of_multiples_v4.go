package summultiples

func SumMultiples(limit int, divisors ...int) (sum int) {
	seen := make(map[int]bool)
	for _, divisor := range divisors {
		if divisor == 0 {
			continue
		}
		for i := divisor; i < limit; i += divisor {
			if !seen[i] {
				sum += i
				seen[i] = true
			}
		}
	}
	return sum
}