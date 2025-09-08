package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	
	if n == 1 {
		return 2, true
	}
	
	primes := make([]int, 0, n)
	primes = append(primes, 2)
	
	candidate := 3
	for len(primes) < n {
		if isPrime(candidate, primes) {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	
	return primes[n-1], true
}

func isPrime(x int, knownPrimes []int) bool {
	limit := x * x
	for _, prime := range knownPrimes {
		if prime*prime > x {
			break
		}
		if x%prime == 0 {
			return false
		}
	}
	return true
}