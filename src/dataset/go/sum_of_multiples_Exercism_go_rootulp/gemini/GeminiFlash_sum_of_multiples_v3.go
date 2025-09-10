package summultiples

func SumMultiples(limit int, divisors ...int) int {
	seen := make(map[int]bool)
	sum := 0
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