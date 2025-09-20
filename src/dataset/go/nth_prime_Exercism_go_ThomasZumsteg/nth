package prime

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	if n == 1 {
		return 2, true
	}

	primes := []int{2}
	candidate := 3

	for len(primes) < n {
		isPrime := true
		limit := int(float64(candidate) / float64(primes[len(primes)-1]))
		for _, p := range primes {
			if p > limit {
				break
			}
			if candidate%p == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	return primes[n-1], true
}