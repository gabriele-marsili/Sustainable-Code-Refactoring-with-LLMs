package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	
	if n == 1 {
		return 2, true
	}
	
	primes := make([]int, 1, min(n, 1000))
	primes[0] = 2
	
	candidate := 3
	for len(primes) < n {
		isPrime := true
		sqrtCandidate := int(float64(candidate) * 0.5)
		
		for i := 0; i < len(primes) && primes[i]*primes[i] <= candidate; i++ {
			if candidate%primes[i] == 0 {
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

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}