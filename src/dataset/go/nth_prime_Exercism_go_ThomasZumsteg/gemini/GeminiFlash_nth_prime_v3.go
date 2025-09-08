package prime

import "math"

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}

	if n <= 8 {
		primes := []int{0, 2, 3, 5, 7, 11, 13, 17}
		return primes[n], true
	}

	primes := []int{2, 3, 5, 7, 11, 13, 17}
	size := 100
	limit := int(math.Sqrt(float64(size))) + 1
	candidates := make([]bool, size)

	for len(primes) < n {
		for i := 0; i < size; i++ {
			candidates[i] = true
		}

		for _, p := range primes {
			if p > limit {
				break
			}
			for i := p * p; i < size; i += p {
				candidates[i] = false
			}
		}

		for candidate := primes[len(primes)-1] + 2; candidate < size; candidate += 2 {
			if candidates[candidate] {
				primes = append(primes, candidate)
			}
		}
		size *= 2
		limit = int(math.Sqrt(float64(size))) + 1
		candidates = make([]bool, size)

	}

	return primes[n-1], true
}