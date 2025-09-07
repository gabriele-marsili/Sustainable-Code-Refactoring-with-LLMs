package prime

func Factors(n int64) (factors []int64) {
	factors = make([]int64, 0, 10) // Pre-allocate some space
	current := n
	divisor := int64(2)

	for current > 1 {
		if current%divisor == 0 {
			factors = append(factors, divisor)
			current /= divisor
			if current == 1 {
				break // Exit early if fully factored
			}
		} else {
			if divisor*divisor > current {
				factors = append(factors, current)
				break
			}
			if divisor == 2 {
				divisor = 3 // Skip even numbers after 2
			} else {
				divisor += 2 // Increment by 2 to check only odd numbers
			}
		}
	}
	return factors
}